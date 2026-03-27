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

async function getDepartments(): Promise<string[]> {
  return employeeRepository.getDepartments();
}

async function getEmployees(): Promise<Employee[]> {
  return employeeRepository.getEmployees();
}

async function createEmployee(input: CreateEmployeeInput): Promise<CreateEmployeeResult> {
  const errors: { firstName?: string; department?: string } = {};

  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const departmentName = input.departmentName.trim();

  const departmentExists = (await employeeRepository.getDepartments()).some(
    (dept) => dept === departmentName
  );

  if (!departmentExists) {
    errors.department = "Department does not exist.";
  }

  if (firstName.length < 3) {
    errors.firstName = "First name must be at least 3 characters.";
  }

  if (errors.firstName || errors.department) {
    return { success: false, errors };
  }

  const employee = await employeeRepository.createEmployee({
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
