import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user-routes.js";
import createRoles from "./utils/createData.js";
import { authenticate } from "./postgresql/db-connector.js";
import createModels from "./postgresql/schema/schemas.js";

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", userRouter);

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));

authenticate();

await createModels();

// createRoles.createPerms();
// createRoles.createAdmin();
// createRoles.createDefault();
// createRoles.createSubAdmin();
// createRoles.createAdminProfile();
// createRoles.createSubAdminProfile();
