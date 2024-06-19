// src/routes/userRoutes.ts
import { Router } from 'express';
import { getAllUsers, getUser, createUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);

export default router;
