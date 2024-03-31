import { Router } from 'express';
import { authenticate } from './authenticate';
import { create } from './create';
import { get } from './get';
import { fetch } from './fetch'

const userRoutes = Router();

userRoutes.get('/:userId', get);
userRoutes.get('/', fetch);
userRoutes.post('/', create);
userRoutes.post('/auth', authenticate);

export { userRoutes };