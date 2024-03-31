import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { makePetDisableUseCase } from '@/use-cases/pets/factories/make-disable-use-case';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export async function disable(request: Request, response: Response, next: NextFunction) {
    const disableParamsSchema = z.object({
        petId: z.string()
    });

    const useCase = makePetDisableUseCase();
    
    try {
        const { petId } = disableParamsSchema.parse(request.params);
        await useCase.execute(petId);

        response.status(204).send();
    } catch (error) {
        if (error instanceof NotFoundError) {
            return response.status(404).send({ message: error.message });
        }
        next(error);
    }
}