export interface User {
    username: string;
    email: string;
    accessToken: string;
    roles: UserRole[],
    firstName: string;
    lastName: string;
}

export enum UserRole {
    ADMIN, USER
}