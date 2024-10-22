import express from "express";
import userController from "../controllers/user-controller.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = express.Router();
userRouter.post("/signup", userController.signup);
userRouter.post("/signin", userController.signin);
userRouter.get("/users/getAll",  userController.getUsers);

export default userRouter;
