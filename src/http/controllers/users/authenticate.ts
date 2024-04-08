import { env } from '@/env';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeUserAuthenticateUseCase } from '@/use-cases/users/factories/make-authenticate-use-case';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

export async function authenticate(request: Request, response: Response, next: NextFunction) {
    const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    });

    const registerUseCase = makeUserAuthenticateUseCase();

    try {
        const { email, password } = registerBodySchema.parse(request.body);

        const { user } = await registerUseCase.execute({ email, password });

        const token = jwt.sign({
            id: user.id
        }, env.SECRET_TOKEN);

        return response.status(200).send({ user, token });
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return response.status(400).send({ message: error.message });
        }

        next(error);
    }

}