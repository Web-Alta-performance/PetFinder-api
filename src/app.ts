import express from 'express';
import { appRoutes } from './http/routes';
import { errorHandler } from './http/middlewares/error-handler';
import cors from 'cors';

export const app = express();

app.use(express.json());
app.use(cors());

appRoutes.get('/', (_, reply) => reply.status(200).send('Hello, world!'));
app.use('/', appRoutes);

// Error middleware
app.use(errorHandler)