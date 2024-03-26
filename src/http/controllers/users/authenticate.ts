import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeUserAuthenticateUseCase } from '@/use-cases/users/factories/make-authenticate-use-case';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export async function authenticate(request: Request, response: Response, next: NextFunction) {
    const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    });

    const { email, password } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeUserAuthenticateUseCase();

        await registerUseCase.execute({ email, password });
        
        return response.status(204).send();
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return response.status(400).send({ message: error.message });
        }

        next(error);
    }

}