import permissionModel from "../postgresql/schema/permissionSchema.js";
import roleModel from "../postgresql/schema/rolesSchema.js";
import { Op } from "sequelize";
import userModel from "../postgresql/schema/userSchema.js";

const perms = ["view1", "view2", "delete", "create"];

const createPerms = () => {
  permissionModel.bulkCreate(
    perms.map((perm) => {
      return { permissions: perm };
    })
  );
};

const createAdmin = async () => {
  try {
    const permsList = await permissionModel.findAll();
    const roles = await roleModel.create({ role: "admin" });
    roles.addPermissions(permsList);
  } catch (err) {
    console.log("Admin already exists");
  }
};

const createDefault = async () => {
  try {
    const perm = await permissionModel.findOne({
      where: {
        permissions: "view1",
      },
    });
    const role = await roleModel.create({
      role: "default",
    });
    role.addPermission(perm);
  } catch (err) {
    console.log("Default role already exists");
  }
};

export default {
  createPerms,
  createAdmin,
  createDefault,
};
