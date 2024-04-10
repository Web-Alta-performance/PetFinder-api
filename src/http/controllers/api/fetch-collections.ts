import { makeApiFetchCollectionsUseCase } from '@/use-cases/api/factories/make-api-fetch-collections-use-case';
import { NextFunction, Request, Response } from 'express';

export async function fetchCollections(_: Request, response: Response, next: NextFunction) {

    const useCase = makeApiFetchCollectionsUseCase();

    try {
        const collections = await useCase.execute();

        response.status(200).send(collections);
    } catch (error) {
        next(error);
    }
}