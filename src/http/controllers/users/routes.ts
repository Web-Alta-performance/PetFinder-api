import { Router } from 'express';

// controllers
import { authenticate } from './authenticate';
import { create } from './create';
import { get } from './get';
import { fetch } from './fetch'
import { remove } from './remove';
import { update } from './update';

const userRoutes = Router();

userRoutes.get('/:userId', get);
userRoutes.get('/', fetch);
userRoutes.post('/', create);
userRoutes.post('/auth', authenticate);
userRoutes.patch('/:userEmail', update);
userRoutes.delete('/:userId', remove);

export { userRoutes };