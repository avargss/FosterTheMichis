export interface User {
    id: number;
    name: string;
    surname: string;
    phoneNumber: number;
    email: string;
    password: string;
    role: "admin" | "user";
}