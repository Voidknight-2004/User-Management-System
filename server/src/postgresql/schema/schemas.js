import userModel from "./userSchema.js";
import roleModel from "./rolesSchema.js";
import permissionModel from "./permissionSchema.js";
import { sequelize } from "../db-connector.js";

const createModels = async () => {
  userModel.belongsToMany(roleModel, {
    through: "UserRoles",
    foreignKey: "userId",
  });
  roleModel.belongsToMany(userModel, {
    through: "UserRoles",
    foreignKey: "roleId",
  });

  roleModel.belongsToMany(permissionModel, {
    through: "PermissionRoles",
    foreignKey: "roleId",
  });
  permissionModel.belongsToMany(roleModel, {
    through: "PermissionRoles",
    foreignKey: "permId",
  });

  await sequelize.sync({ force: true });
};

export default createModels;
