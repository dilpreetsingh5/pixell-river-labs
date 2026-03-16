import type { Request, Response } from "express";
import { employeeService } from "../services/employeeService";

function getDepartments(_req: Request, res: Response): void {
  const departments = employeeService.getDepartments();
  res.status(200).json(departments);
}

function getEmployees(_req: Request, res: Response): void {
  const employees = employeeService.getEmployees();
  res.status(200).json(employees);
}

function createEmployee(req: Request, res: Response): void {
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

  const result = employeeService.createEmployee({
    firstName,
    lastName,
    departmentName
  });

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
