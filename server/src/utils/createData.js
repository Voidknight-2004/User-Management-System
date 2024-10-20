import permissionModel from "../postgresql/schema/permissionSchema.js";
import roleModel from "../postgresql/schema/rolesSchema.js";
import { Op } from "sequelize";
import userModel from "../postgresql/schema/userSchema.js";
import { sequelize } from "../postgresql/db-connector.js";

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

const createSubAdmin = async () => {
  try {
    const perm = await permissionModel.findAll({
      where: {
        [Op.or]: [{ permissions: "view1" }, { permissions: "view2" }],
      },
    });
    const role = await roleModel.create({
      role: "SubAdmin",
    });
    role.addPermission(perm);
  } catch (err) {
    console.log("SubAdmin role already exists");
  }
};

const createSubAdminProfile = async () => {
  try {
    const user = await userModel.create({
      username: "SubAdmin",
      password: "root",
    });
    const Roles = await roleModel.findAll({
      where: {
        [Op.or]: [{ role: "SubAdmin" }, { role: "default" }],
      },
    });
    user.addRoles(Roles);
  } catch (err) {
    console.log(err);
  }
};

const createAdminProfile = async () => {
  try {
    const user = await userModel.create({
      username: "admin",
      password: "root",
    });
    const allRoles = await roleModel.findAll();

    user.addRoles(allRoles);
  } catch (err) {
    console.log("Admin already exists");
  }
};

export default {
  createAdminProfile,
  createPerms,
  createAdmin,
  createDefault,
  createSubAdmin,
  createSubAdminProfile,
};
