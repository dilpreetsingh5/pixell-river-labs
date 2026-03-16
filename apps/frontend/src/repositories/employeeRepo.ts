import type { CreateEmployeeInput, Employee } from '../../../../shared/types/Employees';

const API_BASE_URL = 'http://localhost:3001/api/v1';

async function getDepartments(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/departments`);
    if (!response.ok) {
        throw new Error('Failed to fetch departments');
    }
    return response.json();
}

async function getEmployees(): Promise<Employee[]> {
    const response = await fetch(`${API_BASE_URL}/employees`);
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    return response.json();
}

async function createEmployee(input: CreateEmployeeInput) {
    const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    });

    return response.json();
}

export const employeeRepo = {
    getDepartments,
    getEmployees,
    createEmployee
};
