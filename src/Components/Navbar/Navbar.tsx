import { NavLink } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/employees">Employees</NavLink>
            <NavLink to="/organization">Organization</NavLink>
        </nav>
    );
}

export default Navbar;
