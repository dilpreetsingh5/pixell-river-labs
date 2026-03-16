import { departments } from "../data/departments";
import type { CreateEmployeeInput, Employee } from "../../../../../../shared/types/Employees";

const departmentStore: string[] = departments.map((department) => department.name);

let employeeStore: Employee[] = departments.flatMap((department) =>
  department.employees.map((employee) => ({
    ...employee,
    departmentName: department.name
  }))
);

function getDepartments(): string[] {
  return [...departmentStore];
}

function getEmployees(): Employee[] {
  return [...employeeStore];
}

function createEmployee(input: CreateEmployeeInput): Employee {
  const newEmployee: Employee = {
    firstName: input.firstName,
    lastName: input.lastName,
    departmentName: input.departmentName
  };

  employeeStore = [...employeeStore, newEmployee];
  return newEmployee;
}

export const employeeRepository = {
  getDepartments,
  getEmployees,
  createEmployee
};
