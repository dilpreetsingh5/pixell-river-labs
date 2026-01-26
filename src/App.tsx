import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Department from './Components/Department/Department';
import EmployeeForm from './Components/EmployeeForm/EmployeeForm';
import { departments as initialDepartments } from './data/departments';
import type { Department as DepartmentType } from './types/Department';

// Main App component
function App() {
    const [departments, setDepartments] = useState<DepartmentType[]>(initialDepartments);

    const handleAddEmployee = (
        firstName: string,
        lastName: string,
        departmentName: string
    ) => {
        setDepartments(prevDepartments =>
            prevDepartments.map(dept =>
                dept.name === departmentName
                    ? {
                        ...dept,
                        employees: [
                            ...dept.employees,
                            { firstName, lastName }
                        ]
                    }
                    : dept
            )
        );
    };
    return (
        <>
            <Header />
            <main>
                {departments.map((department, index) => (
                    <Department key={index} department={department} />
                ))}
            </main>

            {/* Form at the bottom */}
            <EmployeeForm
                departments={departments}
                onAddEmployee={handleAddEmployee}
            />
            
            <Footer />
        </>
    );
}

export default App;
