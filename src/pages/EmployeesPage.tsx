import Department from '../Components/Department/Department';
import EmployeeForm from '../Components/EmployeeForm/EmployeeForm';
import type { Department as DepartmentType } from '../types/Department';
import type { Employee } from '../types/Employees';

interface Props {
    departments: string[];
    employees: Employee[];
    onEmployeeCreated: 
    () => void;
}

function EmployeesPage({ departments, employees, onEmployeeCreated }: Props) {
    const departmentObjects: DepartmentType[] = departments.map(deptName => ({
        name: deptName,
        employees: employees
            .filter(emp => emp.departmentName === deptName)
            .map(emp => ({ firstName: emp.firstName, lastName: emp.lastName }))
    }));
    return (
        <>
            <main>
                {departmentObjects.map((department, index) => (
                    <Department key={index} department={department} />
                ))}
            </main>

            <EmployeeForm departments={departments} onEmployeeCreated={onEmployeeCreated} />
        </>
    );
}

export default EmployeesPage;

