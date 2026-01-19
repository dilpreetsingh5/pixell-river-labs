import './Header.css';
import logo from '../../assets/pixell-river-logo.png';

function Header() {
    return (
        <header>
            <div className="header-content">
                <div className="logo-section">
                    <img src={logo} alt="Pixell River Financial Logo" className="logo" />
                </div>
                <div className="title-section">
                    <h1>Pixell River Employee Directory</h1>
                    <p className="greeting">Welcome! Explore our team and departments.</p>
                </div>
            </div>
        </header>
    );
}

export default Header;
