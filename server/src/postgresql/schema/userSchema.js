import { sequelize } from "../db-connector.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const userModel = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,

      defaultValue: () => uuidv4(),
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

export default userModel;
