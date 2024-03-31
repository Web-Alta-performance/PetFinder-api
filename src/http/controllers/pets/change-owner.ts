import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { makePetChangeOwnerUseCase } from '@/use-cases/pets/factories/make-change-owner-use-case';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export async function changeOwner(request: Request, response: Response, next: NextFunction) {
    const changeOwnerBodySchema = z.object({
        userId: z.string()
    });
    const changeOwnerParamsSchema = z.object({
        petId: z.string()
    });

    const useCase = makePetChangeOwnerUseCase();
    
    try {
        const { userId } = changeOwnerBodySchema.parse(request.body);
        const { petId } = changeOwnerParamsSchema.parse(request.params);
        
        await useCase.execute(petId, userId);
        
        response.status(204).send();
    } catch(error) {
        if (error instanceof NotFoundError) {
            return response.status(404).send({ message: error.message });
        }
        next(error);
    }
}