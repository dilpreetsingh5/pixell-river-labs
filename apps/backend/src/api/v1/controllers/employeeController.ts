import type { Request, Response } from "express";
import { employeeService } from "../services/employeeService";

async function getDepartments(_req: Request, res: Response): Promise<void> {
  try {
    const departments = await employeeService.getDepartments();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load departments." });
  }
}

async function getEmployees(_req: Request, res: Response): Promise<void> {
  try {
    const employees = await employeeService.getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load employees." });
  }
}

async function createEmployee(req: Request, res: Response): Promise<void> {
  const { firstName, lastName, departmentName } = req.body ?? {};

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof departmentName !== "string"
  ) {
    res.status(400).json({
      success: false,
      errors: {
        payload: "Invalid payload. firstName, lastName, departmentName are required."
      }
    });
    return;
  }

  let result;
  try {
    result = await employeeService.createEmployee({
      firstName,
      lastName,
      departmentName
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create employee." });
    return;
  }

  if (!result.success) {
    res.status(400).json(result);
    return;
  }

  res.status(201).json(result);
}

export const employeeController = {
  getDepartments,
  getEmployees,
  createEmployee
};
