// src/controllers/userController.ts
import { Request, Response } from 'express';
import { getUsers, getUserById, addUser } from '../services/userService';
import { User } from '../models/user';

export const getAllUsers = (req: Request, res: Response): void => {
    res.json(getUsers());
};

export const getUser = (req: Request, res: Response): void => {
    const user = getUserById(Number(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
};

export const createUser = (req: Request, res: Response): void => {
    const newUser: User = req.body;
    addUser(newUser);
    res.status(201).json(newUser);
};
