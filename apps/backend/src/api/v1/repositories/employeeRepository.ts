import type { CreateEmployeeInput, Employee } from "../../../../../../shared/types/Employees";
import { prisma } from "../../../db/prisma";

async function getDepartments(): Promise<string[]> {
  const departments = await prisma.department.findMany({
    select: { name: true },
    orderBy: { name: "asc" }
  });

  return departments.map((department) => department.name);
}

async function getEmployees(): Promise<Employee[]> {
  const employees = await prisma.employee.findMany({
    select: {
      firstName: true,
      lastName: true,
      department: { select: { name: true } }
    },
    orderBy: [
      { department: { name: "asc" } },
      { lastName: "asc" },
      { firstName: "asc" }
    ]
  });

  return employees.map((employee) => ({
    firstName: employee.firstName,
    lastName: employee.lastName,
    departmentName: employee.department.name
  }));
}

async function createEmployee(input: CreateEmployeeInput): Promise<Employee> {
  const created = await prisma.employee.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      department: { connect: { name: input.departmentName } }
    },
    select: {
      firstName: true,
      lastName: true,
      department: { select: { name: true } }
    }
  });

  return {
    firstName: created.firstName,
    lastName: created.lastName,
    departmentName: created.department.name
  };
}

export const employeeRepository = {
  getDepartments,
  getEmployees,
  createEmployee
};
