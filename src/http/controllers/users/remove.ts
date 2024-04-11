import { NotFoundError } from "@/use-cases/errors/not-found-error";
import { makeRemoveUserUseCase } from "@/use-cases/users/factories/make-remove-use-case";
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export async function remove(request: Request, response: Response, next: NextFunction) {

    const deleteParamsSchema = z.object({
        userId: z.string()
    });

    const removeUseCase = makeRemoveUserUseCase();

    try {
        const { userId } = deleteParamsSchema.parse(request.params);

        await removeUseCase.execute(userId);

        return response.status(204).send();
    } catch (error) {
        if (error instanceof NotFoundError) {
            return response.status(401).send({ message: error.message });
        }

        next(error);
    }

}