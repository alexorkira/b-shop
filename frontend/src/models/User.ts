export enum Role {
    USER,
    ADMIN
}

export interface User {
    id: string,
    name: string,
    role: Role,
}