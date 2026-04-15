import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';
import './Header.css';
import logo from '../../assets/pixell-river-logo.png';

function Header() {
    return (
        <header>
            <div className="header-content">
                <div className="header-top-row">
                    <div className="brand-row">
                        <div className="logo-section">
                            <img src={logo} alt="Pixell River Financial Logo" className="logo" />
                        </div>
                        <div className="title-section">
                            <h1>Pixell River Employee Directory</h1>
                            <p className="greeting">Welcome! Explore our team and departments.</p>
                        </div>
                    </div>

                    <div className="header-auth">
                        <Show when="signed-out">
                            <div className="header-auth-actions">
                                <SignInButton mode="modal">
                                    <button type="button" className="header-auth-button header-auth-button--ghost">
                                        Sign in
                                    </button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button type="button" className="header-auth-button">
                                        Sign up
                                    </button>
                                </SignUpButton>
                            </div>
                        </Show>

                        <Show when="signed-in">
                            <UserButton />
                        </Show>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
