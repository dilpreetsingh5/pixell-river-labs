import type { Employee } from './Employees';

export interface Department {
    name: string;
    employees: Employee[];
}