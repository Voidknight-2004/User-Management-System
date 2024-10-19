import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgres", "postgres", "Rohan2004#", {
  host: "localhost",
  
  dialect: "postgres",
});

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export { authenticate, sequelize };
