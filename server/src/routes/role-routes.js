import express from "express";
import roleController from "../controllers/role-controller.js";
import verifyToken from "../middleware/verifyToken.js";

const roleRouter = express.Router();
roleRouter.delete(
  "/users/:username/deleterole/:role",
  roleController.deleteRole
);
roleRouter.post("/users/:username/addrole/:role", roleController.createRole);

export default roleRouter;
