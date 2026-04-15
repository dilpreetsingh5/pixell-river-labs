import { clerkMiddleware, requireAuth } from "@clerk/express";
import { Router } from "express";
import { employeeController } from "../controllers/employeeController";
import { findOrCreateUser } from "../middleware/findOrCreateUser";

const employeeRouter = Router();

employeeRouter.get("/departments", employeeController.getDepartments);
employeeRouter.get("/employees", employeeController.getEmployees);
employeeRouter.post(
  "/employees",
  clerkMiddleware(),
  requireAuth(),
  findOrCreateUser,
  employeeController.createEmployee
);

export { employeeRouter };
