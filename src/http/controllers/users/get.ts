import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { makeUserGetUseCase } from '@/use-cases/users/factories/make-get-use-case';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export async function get(request: Request, response: Response, next: NextFunction) {
    const registerParamsSchema = z.object({
        userId: z.string()
    });

    const { userId } = registerParamsSchema.parse(request.params);
    const getUseCase = makeUserGetUseCase();

    try {
        const user = await getUseCase.execute(userId);
        
        return response.status(200).send(user);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return response.status(404).send({ message: error.message });
        }

        next(error);
    }

}