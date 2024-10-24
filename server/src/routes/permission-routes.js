import express, { Router } from "express";
import permissionController from "../controllers/permission-controller.js";


const permissionRouter=express.Router();

permissionRouter.get("/roles/getperms/:role",permissionController.getPerms)

export default permissionRouter;