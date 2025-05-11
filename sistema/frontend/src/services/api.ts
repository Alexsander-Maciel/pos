import axios from 'axios';

const API_URL = 'http://localhost:4000/auth/login'; // Replace with your actual API URL

export const login = async (usernameOrEmail: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            usernameOrEmail,
            password
        });
        return response.data.success; // Adjust based on your API response structure
    } catch (error) {
        console.error('Login failed:', error);
        return false;
    }
};

// Add other API functions as needed, e.g., fetching user data, etc.