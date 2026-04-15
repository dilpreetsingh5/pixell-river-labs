import { NavLink } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__links">
                <NavLink to="/employees">Employees</NavLink>
                <NavLink to="/organization">Organization</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
