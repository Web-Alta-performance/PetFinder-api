import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { makeUserFetchUseCase } from '@/use-cases/users/factories/make-fetch-use-case';
import { Request, Response, NextFunction } from 'express';

export async function fetch(_: Request, response: Response, next: NextFunction) {
    const fetchUseCase = makeUserFetchUseCase();

    try {
        const users = await fetchUseCase.execute();
        
        return response.status(200).send(users);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return response.status(404).send({ message: error.message });
        }

        next(error);
    }

}