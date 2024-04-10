import { Router } from 'express';
import { fetchCollections } from './fetch-collections';

const apiRoutes = Router();

apiRoutes.get('/collections', fetchCollections);

export { apiRoutes };