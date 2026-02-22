import type { CreateEmployeeInput, Employee } from '../types/Employees';
import { departments as seedDepartments } from '../data/departments';

const departmentStore: string[] = seedDepartments.map(department => department.name);
let employeeStore: Employee[] = seedDepartments.flatMap(department =>
    department.employees.map(employee => ({
        ...employee,
        departmentName: department.name
    }))
);

function getDepartments() {
    return [...departmentStore];
}

function getEmployees() {
    return [...employeeStore];
}

function createEmployee(input: CreateEmployeeInput) {
    const newEmployee: Employee = {
        firstName: input.firstName,
        lastName: input.lastName,
        departmentName: input.departmentName
    };

    employeeStore = [...employeeStore, newEmployee];
    return newEmployee;
}

export const employeeRepo = {
    getDepartments,
    getEmployees,
    createEmployee
};
