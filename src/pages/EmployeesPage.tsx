import Department from '../Components/Department/Department';
import EmployeeForm from '../Components/EmployeeForm/EmployeeForm';
import type { Department as DepartmentType } from '../types/Department';

interface Props {
    departments: DepartmentType[];
    onAddEmployee: (
        firstName: string,
        lastName: string,
        departmentName: string
    ) => void;
}

function EmployeesPage({ departments, onAddEmployee }: Props) {
    return (
        <>
            <main>
                {departments.map((department, index) => (
                    <Department key={index} department={department} />
                ))}
            </main>

            <EmployeeForm
                departments={departments}
                onAddEmployee={onAddEmployee}
            />
        </>
    );
}

export default EmployeesPage;

