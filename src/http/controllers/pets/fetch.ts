import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { makePetFetchUseCase } from '@/use-cases/pets/factories/make-fetch-use-case';
import { NextFunction, Request, Response } from 'express';

export async function fetch(_: Request, response: Response, next: NextFunction) {

    const useCase = makePetFetchUseCase();

    try {
        const pets = await useCase.execute();

        response.status(200).send(pets);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return response.status(404).send({ message: error.message });
        }
        
        next(error);
    }
}