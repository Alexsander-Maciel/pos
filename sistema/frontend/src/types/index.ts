export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    success: boolean;
    token?: string;
    user?: User;
    message?: string;
}