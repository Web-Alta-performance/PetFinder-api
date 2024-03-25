import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from '@/use-cases/register';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

export async function register(request: Request, response: Response) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    });

    try {
        console.log(request.body);
        const { name, email, password } = registerBodySchema.parse(request.body);

        const repository = new PrismaUsersRepository();
        const registeruseCase = new RegisterUseCase(repository); 

        await registeruseCase.execute({ name, email, password });
    } catch (error) {
        if (error instanceof ZodError) return response.status(400).send(error.format())
        return response.status(500).send({ message: error })
    }

    return response.status(201).send();
}