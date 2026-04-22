import Department from '../Components/Department/Department';
import EmployeeForm from '../Components/EmployeeForm/EmployeeForm';
import type { Department as DepartmentType } from '../../../../shared/types/Department';
import { useDepartmentsQuery, useEmployeesQuery } from '../queries/employeeQueries';

function EmployeesPage() {
    const departmentsQuery = useDepartmentsQuery();
    const employeesQuery = useEmployeesQuery();

    const departments = departmentsQuery.data ?? [];
    const employees = employeesQuery.data ?? [];
    const isLoading = departmentsQuery.isLoading || employeesQuery.isLoading;
    const hasError = Boolean(departmentsQuery.error ?? employeesQuery.error);

    const departmentObjects: DepartmentType[] = departments.map(deptName => ({
        name: deptName,
        employees: employees
            .filter(emp => emp.departmentName === deptName)
            .map(emp => ({ firstName: emp.firstName, lastName: emp.lastName }))
    }));
    return (
        <>
            <main>
                {isLoading && <p>Loading employees...</p>}
                {!isLoading && hasError && (
                    <p className="error">Could not load employees and departments.</p>
                )}
                {departmentObjects.map((department, index) => (
                    <Department key={index} department={department} />
                ))}
            </main>

            <EmployeeForm departments={departments} />
        </>
    );
}

export default EmployeesPage;

