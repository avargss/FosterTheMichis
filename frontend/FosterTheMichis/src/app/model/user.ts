export interface User {
    id: number;
    name: string;
    surname: string;
    phone_number: number;
    email: string;
    password: string;
    role: "Admin" | "User";
}