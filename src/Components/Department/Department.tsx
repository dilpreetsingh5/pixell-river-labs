import './Department.css';
import type { Department as DepartmentType } from '../../Types/Department.ts';

interface DepartmentProps {
    department: DepartmentType;
}

function Department({ department }: DepartmentProps) {
    return (
        <section className="department-section">
            <h2 className="department-name">{department.name}</h2>
            <ul className="employee-list">
                {department.employees.map((employee, index) => (
                    <li key={index} className="employee-item">
                        {employee.firstName} {employee.lastName}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Department;
