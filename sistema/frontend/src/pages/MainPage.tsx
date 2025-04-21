import React from 'react';
import MainMenu from '../components/MainMenu';

const MainPage: React.FC = () => {
    const userRole = 'admin'; // Example role, replace with dynamic data if needed

    return (
        <div>
            <MainMenu userRole={userRole} />
            <h1>Main Page</h1>
            <p>Welcome to the main content area!</p>
            {/* Additional content based on user role or group can be added here */}
        </div>
    );
};

export default MainPage;