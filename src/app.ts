import express from 'express';
import { appRoutes } from './http/routes';

export const app = express();
app.use('/', appRoutes);

// TODO: better error handler (other than express' default one)