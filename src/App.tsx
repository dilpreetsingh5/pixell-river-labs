import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';

import EmployeesPage from './pages/EmployeesPage';
import OrganizationPage from './pages/OrganizationPage';

import { employeeRepo } from './repositories/employeeRepo';
import { organizationRepo } from './repositories/organizationRepo';
import type { Employee } from './types/Employees';
import type { Role } from './types/Role';

function App() {
    const [departments] = useState<string[]>(() => employeeRepo.getDepartments());
    const [employees, setEmployees] = useState<Employee[]>(() => employeeRepo.getEmployees());
    const [roles, setRoles] = useState<Role[]>(() => organizationRepo.getRoles());

    const refreshEmployees = () => {
        setEmployees(employeeRepo.getEmployees());
    };

    const refreshRoles = () => {
        setRoles(organizationRepo.getRoles());
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