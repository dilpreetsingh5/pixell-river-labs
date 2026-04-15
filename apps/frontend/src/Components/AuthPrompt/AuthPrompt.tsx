import { SignInButton } from '@clerk/react';
import './AuthPrompt.css';

interface Props {
    title: string;
    message: string;
}

function AuthPrompt({ title, message }: Props) {
    return (
        <section className="auth-prompt" aria-live="polite">
            <h2>{title}</h2>
            <p>{message}</p>
            <SignInButton mode="modal">
                <button type="button" className="auth-prompt__button">
                    Log In to Continue
                </button>
            </SignInButton>
        </section>
    );
}

export default AuthPrompt;
