import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';

import EmployeesPage from './pages/EmployeesPage';
import OrganizationPage from './pages/OrganizationPage';

import { employeeService } from './services/employeeService';
import { organizationService } from './services/organizationService';
import type { Employee } from '../../../shared/types/Employees.ts';
import type { Role } from '../../../shared/types/Role.ts';

function App() {
    const [departments, setDepartments] = useState<string[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const refreshEmployees = async () => {
        const [nextDepartments, nextEmployees] = await Promise.all([
            employeeService.getDepartments(),
            employeeService.getEmployees()
        ]);
        setDepartments(nextDepartments);
        setEmployees(nextEmployees);
    };

    const refreshRoles = async () => {
        const nextRoles = await organizationService.getRoles();
        setRoles(nextRoles);
    };

    useEffect(() => {
        void refreshEmployees();
        void refreshRoles();
    }, []);

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
                            employees={employees}
                            onEmployeeCreated={refreshEmployees}
                        />
                    }
                />
                <Route
                    path="/organization"
                    element={<OrganizationPage roles={roles} onRoleCreated={refreshRoles} />}
                />
                <Route path="*" element={<Navigate to="/employees" />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
