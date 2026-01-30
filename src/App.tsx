import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';

import EmployeesPage from './pages/EmployeesPage';
import OrganizationPage from './pages/OrganizationPage';

import { departments as initialDepartments } from './data/departments';
import type { Department as DepartmentType } from './types/Department';

function App() {
    const [departments, setDepartments] = useState<DepartmentType[]>(initialDepartments);

    const handleAddEmployee = (
        firstName: string,
        lastName: string,
        departmentName: string
    ) => {
        setDepartments(prev =>
            prev.map(dept =>
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
        <BrowserRouter>
            <Header />
            <Navbar />

            <Routes>
                <Route
                    path="/employees"
                    element={
                        <EmployeesPage
                            departments={departments}
                            onAddEmployee={handleAddEmployee}
                        />
                    }
                />
                <Route path="/organization" element={<OrganizationPage />} />
                <Route path="*" element={<Navigate to="/employees" />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
