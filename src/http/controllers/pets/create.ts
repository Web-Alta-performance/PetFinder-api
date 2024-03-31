import { makePetCreateUseCase } from '@/use-cases/pets/factories/make-create-use-case';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export async function create(request: Request, response: Response, next: NextFunction) {
    const createBodySchema = z.object({
        name: z.string(),
        size: z.enum(['small', 'medium', 'big']),
        userId: z.string(),
        age: z.coerce.number().optional(),
        about: z.string().optional(),
        breed: z.string().optional(),
    });

    const useCase = makePetCreateUseCase();
    
    try {
        const data = createBodySchema.parse(request.body);
        const pet = useCase.execute(data);

        response.status(201).send(pet);
    } catch (error) {
        next(error)
    }
}