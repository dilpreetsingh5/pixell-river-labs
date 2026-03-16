import { Router } from "express";
import { employeeController } from "../controllers/employeeController";

const employeeRouter = Router();

employeeRouter.get("/departments", employeeController.getDepartments);
employeeRouter.get("/employees", employeeController.getEmployees);
employeeRouter.post("/employees", employeeController.createEmployee);

export { employeeRouter };
