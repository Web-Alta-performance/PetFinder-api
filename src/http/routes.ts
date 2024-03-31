import { Router } from 'express';
import { userRoutes } from './controllers/users/routes';
import { petRoutes } from './controllers/pets/routes';

const appRoutes = Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/pets', petRoutes);

export { appRoutes };