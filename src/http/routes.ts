import { Router } from 'express';

import { userRoutes } from './controllers/users/routes';
import { petRoutes } from './controllers/pets/routes';
import { apiRoutes } from './controllers/api/routes';

const appRoutes = Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/pets', petRoutes);
appRoutes.use('/api', apiRoutes);

export { appRoutes };