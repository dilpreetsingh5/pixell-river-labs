import { Router } from "express";
import { roleController } from "../controllers/roleController";

const roleRouter = Router();

roleRouter.get("/roles", roleController.getRoles);
roleRouter.post("/roles", roleController.createRole);

export { roleRouter };
