import express from 'express';
import { appRoutes } from './http/routes';

export const app = express();

app.use(express.json());

appRoutes.get('/', (_, reply) => reply.status(200).send('Hello, world!'));
app.use('/', appRoutes);

// TODO: better error handler (other than express' default one)