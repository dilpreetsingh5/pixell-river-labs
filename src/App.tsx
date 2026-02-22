import { useEffect,useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';

import EmployeesPage from './pages/EmployeesPage';
import OrganizationPage from './pages/OrganizationPage';

import { employeeRepo } from './repositories/employeeRepo';
import type { Employee } from './types/Employees';

function App() {
    const [departments, setDepartments] = useState<string[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        setDepartments(employeeRepo.getDepartments());
        setEmployees(employeeRepo.getEmployees());
    }, []);

    const refreshEmployees = () => {
        setEmployees(employeeRepo.getEmployees());
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
                    element={<OrganizationPage />} 
                />
                <Route path="*" element={<Navigate to="/employees" />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
