import { employeeRepo } from '../repositories/employeeRepo';
import type { CreateEmployeeInput, Employee } from '../../../../shared/types/Employees';

interface CreateEmployeeResult {
    success: boolean;
    employee?: Employee;
    errors?: {
        firstName?: string;
        department?: string;
    };
}

async function getDepartments(): Promise<string[]> {
    return employeeRepo.getDepartments();
}

async function getEmployees(): Promise<Employee[]> {
    return employeeRepo.getEmployees();
}

async function createEmployee(input: CreateEmployeeInput): Promise<CreateEmployeeResult> {
    const firstName = input.firstName.trim();
    const lastName = input.lastName.trim();
    const departmentName = input.departmentName.trim();

    if (firstName.length < 3) {
        return {
            success: false,
            errors: { firstName: 'First name must be at least 3 characters.' }
        };
    }

    const result = await employeeRepo.createEmployee({
        firstName,
        lastName,
        departmentName
    });

    return result;
}

export const employeeService = {
    getDepartments,
    getEmployees,
    createEmployee
};
