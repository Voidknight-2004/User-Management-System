import { sequelize } from "../postgresql/db-connector.js";
import roleModel from "../postgresql/schema/rolesSchema.js";
import userModel from "../postgresql/schema/userSchema.js";

const deleteRole = async (req, res) => {
  try {
    const { username, role } = req.params;

    const userInstance = await userModel.findOne({
      where: {
        username: username,
      },
      include: [
        {
          model: roleModel,
          as: "roles",
          attributes: ["roleId", "role"],
          through: { attributes: [] },
        },
      ],
    });

    const checkPerms = async () => {
      for (const eachrole of userInstance.roles) {
        const roleInstance = await roleModel.findOne({
          where: {
            role: eachrole.name,
          },
        });
        if (await roleInstance.hasPermission("delete")) return true;
      }
    };

    if (checkPerms()) {
      const roleToDelete = userInstance.roles.find((r) => r.role === role);
      if (roleToDelete) {
        await userInstance.removeRole(roleToDelete);

        const updatedUserData = await userModel.findOne({
          where: {
            username: username,
          },
          include: [
            {
              model: roleModel,
              as: "roles",
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
    const userInstance = await userModel.findOne({
      where: {
        username: username,
      },
    });
    if (userInstance.hasRole(role)) res.status(402).send("Role already exists");
    else {
      await userInstance.addRole(role);
      res.status(201).send("Role added!");
    }
  } catch {
    res.status(403).send("Role could not be added");
  }
};

const roleController = {
  createRole,
  deleteRole,
};

export default roleController;
