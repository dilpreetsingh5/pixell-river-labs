import { clerkMiddleware, requireAuth } from "@clerk/express";
import { Router } from "express";
import { roleController } from "../controllers/roleController";
import { findOrCreateUser } from "../middleware/findOrCreateUser";

const roleRouter = Router();

roleRouter.get("/roles", roleController.getRoles);
roleRouter.post("/roles", clerkMiddleware(), requireAuth(), findOrCreateUser, roleController.createRole);

export { roleRouter };
