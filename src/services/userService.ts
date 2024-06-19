// src/services/userService.ts
import { User } from '../models/user';

let users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
];

export const getUsers = (): User[] => {
    return users;
};

export const getUserById = (id: number): User | undefined => {
    return users.find(user => user.id === id);
};

export const addUser = (user: User): void => {
    users.push(user);
};
