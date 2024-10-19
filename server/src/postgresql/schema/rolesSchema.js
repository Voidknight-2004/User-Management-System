import { sequelize } from "../db-connector.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

const roleModel = sequelize.define("Role", {
  roleId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false,
    unique: true,
  },
});

export default roleModel;
