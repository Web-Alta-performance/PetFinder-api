import express, { NextFunction, Request, Response } from 'express';
import { appRoutes } from './http/routes';
import { ZodError } from 'zod';
import { env } from './env';

export const app = express();

app.use(express.json());

appRoutes.get('/', (_, reply) => reply.status(200).send('Hello, world!'));
app.use('/', appRoutes);

// Error middleware
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        return response
            .status(400)
            .send({
                message: 'Validation error.',
                issues: error.format()
            });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    }

    return response.status(500).send({ message: 'Internal server error.' });
})