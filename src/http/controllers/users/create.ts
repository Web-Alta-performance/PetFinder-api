import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { CreateUseCase } from '@/use-cases/users/create';
import { makeCreateUseCase } from "@/use-cases/users/factories/make-create-use-case";
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

export async function create(request: Request, response: Response) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeCreateUseCase();

        await registerUseCase.execute({ name, email, password });
    } catch (error) {
        throw error
    }

    return response.status(201).send();
}