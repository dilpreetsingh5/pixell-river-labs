import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';

import EmployeesPage from './pages/EmployeesPage';
import OrganizationPage from './pages/OrganizationPage';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Navbar />

            <Routes>
                <Route path="/employees" element={<EmployeesPage />} />
                <Route path="/organization" element={<OrganizationPage />} />
                <Route path="*" element={<Navigate to="/employees" />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
