import { sequelize } from "../db-connector.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

const permissionModel = sequelize.define("Permission", {
  permId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  permissions: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default permissionModel;
