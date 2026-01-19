import type { Employee } from './Employees.ts';

export interface Department {
    name: string;
    employees: Employee[];
}