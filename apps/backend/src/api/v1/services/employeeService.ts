import { employeeRepository } from "../repositories/employeeRepository";
import type { CreateEmployeeInput, Employee } from "../../../../../../shared/types/Employees";

interface CreateEmployeeResult {
  success: boolean;
  employee?: Employee;
  errors?: {
    firstName?: string;
    department?: string;
  };
}

function getDepartments(): string[] {
  return employeeRepository.getDepartments();
}

function getEmployees(): Employee[] {
  return employeeRepository.getEmployees();
}

function createEmployee(input: CreateEmployeeInput): CreateEmployeeResult {
  const errors: { firstName?: string; department?: string } = {};

  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const departmentName = input.departmentName.trim();

  const departmentExists = employeeRepository
    .getDepartments()
    .some((dept) => dept === departmentName);

  if (!departmentExists) {
    errors.department = "Department does not exist.";
  }

  if (firstName.length < 3) {
    errors.firstName = "First name must be at least 3 characters.";
  }

  if (errors.firstName || errors.department) {
    return { success: false, errors };
  }

  const employee = employeeRepository.createEmployee({
    firstName,
    lastName,
    departmentName
  });

  return { success: true, employee };
}

export const employeeService = {
  getDepartments,
  getEmployees,
  createEmployee
};
