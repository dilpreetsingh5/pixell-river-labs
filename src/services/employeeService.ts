import { employeeRepo } from '../repositories/employeeRepo';
import type { CreateEmployeeInput, Employee } from '../types/Employees';

// Result type
interface CreateEmployeeResult {
    success: boolean;
    employee?: Employee;
    errors?: {
        firstName?: string;
        department?: string;
    };
}

function getDepartments(): string[] {
    return employeeRepo.getDepartments();
}

function createEmployee(input: CreateEmployeeInput): CreateEmployeeResult {
    const errors: { firstName?: string; department?: string } = {};

    const firstName = input.firstName.trim();
    const lastName = input.lastName.trim();
    const departmentName = input.departmentName.trim();

    // Check department exists
    const departmentExists = employeeRepo
        .getDepartments()
        .some(dept => dept === departmentName);

    if (!departmentExists) {
        errors.department = 'Department does not exist.';
    }

    // Validate first name
    if (firstName.length < 3) {
        errors.firstName = 'First name must be at least 3 characters.';
    }

    // If any errors → return
    if (errors.firstName || errors.department) {
        return {
            success: false,
            errors
        };
    }

    // Create employee
    const employee = employeeRepo.createEmployee({
        firstName,
        lastName,
        departmentName
    });

    return {
        success: true,
        employee
    };
}

export const employeeService = {
    getDepartments,
    createEmployee
};
