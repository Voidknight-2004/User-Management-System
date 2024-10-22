import { sequelize } from "../postgresql/db-connector.js";
import jwt from "jsonwebtoken";
import permissionModel from "../postgresql/schema/permissionSchema.js";
import roleModel from "../postgresql/schema/rolesSchema.js";
import userModel from "../postgresql/schema/userSchema.js";
const SECRET_KEY = "f27om2feQYLKQZl6uBkw";

const deleteRole = async (req, res) => {
  try {
    const { username, role } = req.params;
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const currentUser = decoded.username;

    const currentUserInstance = await userModel.findOne({
      where: {
        username: currentUser,
      },
      include: [
        {
          model: roleModel,
          as: "Roles",
          attributes: ["roleId", "role"],
          through: { attributes: [] },
        },
      ],
    });

    const userInstance = await userModel.findOne({
      where: {
        username: username,
      },
      include: [
        {
          model: roleModel,
          as: "Roles",
          attributes: ["roleId", "role"],
          through: { attributes: [] },
        },
      ],
    });
    const checkPerms = async () => {
      const deleteRolePerm = await permissionModel.findOne({
        where: {
          permissions: "delete",
        },
      });

      for (const eachrole of currentUserInstance.dataValues.Roles) {
        console.log("hello im here");
        const roleInstance = await roleModel.findOne({
          where: {
            role: eachrole.role,
          },
        });
        if (await roleInstance.hasPermission(deleteRolePerm)) return true;
      }
      return false;
    };
    const isOk = await checkPerms();
    if (isOk) {
      const roleToDelete = userInstance.dataValues.Roles.find((r) => r.role === role);
      if (roleToDelete) {
        await userInstance.removeRole(roleToDelete);

        const updatedUserData = await userModel.findOne({
          where: {
            username: username,
          },
          include: [
            {
              model: roleModel,
              as: "Roles",
              attributes: ["roleId", "role"],
              through: { attributes: [] },
            },
          ],
        });

        res.status(201).json([updatedUserData]);
      } else {
        res.status(404).json({ error: "Role not found" });
      }
    } else {
      res.status(402).send("No permission to delete");
    }
  } catch (err) {
    console.error("Error deleting role:", err);
    res.status(500).json({ error: "Could not delete role" });
  }
};

const createRole = async (req, res) => {
  try {
    const { username, role } = req.params;
    console.log(role, username);
    const userInstance = await userModel.findOne({
      where: {
        username: username,
      },
    });

    const roleInstance = await roleModel.findOne({
      where: {
        role: role,
      },
    });

    if (await userInstance.hasRole(roleInstance))
      res.status(402).send("Role already exists");
    else {
      await userInstance.addRole(roleInstance);
      res.status(201).send("Role added!");
    }
  } catch (err) {
    console.log(err);
    res.status(403).send("Role could not be added");
  }
};

const roleController = {
  createRole,
  deleteRole,
};

export default roleController;
