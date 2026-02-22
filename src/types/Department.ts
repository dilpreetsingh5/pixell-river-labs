export interface DepartmentEmployee {
    firstName: string;
    lastName: string;
}

export interface Department {
    name: string;
    employees: DepartmentEmployee[];
}