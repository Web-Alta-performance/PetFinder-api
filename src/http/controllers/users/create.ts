import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeUserCreateUseCase } from "@/use-cases/users/factories/make-create-use-case";
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export async function create(request: Request, response: Response, next: NextFunction) {
    
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    });

    const registerUseCase = makeUserCreateUseCase();
    
    try {
        const { name, email, password } = registerBodySchema.parse(request.body);

        await registerUseCase.execute({ name, email, password });
        
        return response.status(201).send();
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return response.status(401).send({ message: error.message });
        }

        next(error);
    }

}