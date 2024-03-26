import { makeAuthenticateUseCase } from '@/use-cases/users/factories/make-authenticate-use-case';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function authenticate(request: Request, response: Response) {
    const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    });

    const { email, password } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeAuthenticateUseCase();

        await registerUseCase.execute({ email, password });
    } catch (error) {
        throw error
    }

    return response.status(201).send();
}