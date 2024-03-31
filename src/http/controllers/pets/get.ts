import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { makePetGetUseCase } from '@/use-cases/pets/factories/make-get-use-case';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export async function get(request: Request, response: Response, next: NextFunction) {
    const petParamSchema = z.object({
        petId: z.string()
    });

    const useCase = makePetGetUseCase();
    
    try {
        const { petId } = petParamSchema.parse(request.params);
        const pet = await useCase.execute(petId);

        response.status(200).send(pet)
    } catch (error) {
        if (error instanceof NotFoundError) {
            return response.status(404).send({ message: error.message });
        }

        next(error);
    }
}