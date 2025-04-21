import React, { useState } from 'react';
import LoginForm from '../components/LoginForm'; // Ensure the correct path to LoginForm
import './LoginPage.scss'; // Import the Sass file for styling

const LoginPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (username: string, password: string) => {
        try {
            if (username === 'admin' && password === 'password') {
                console.log('Login successful');
                // Redirect to the main page or perform other actions
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <LoginForm onLogin={handleLogin} />
            </div>
        </div>
    );
};

export default LoginPage;