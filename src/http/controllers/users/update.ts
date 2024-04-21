import { NotFoundError } from "@/use-cases/errors/not-found-error";
import { makeUserUpdateUseCase } from "@/use-cases/users/factories/make-update-use-case";
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export async function update(request: Request, response: Response, next: NextFunction) {

    const updateParamsSchema = z.object({
        userEmail: z.string().email()
    });

    const updateBodySchema = z.object({
        name: z.string().optional(),
        password: z.string().optional()
    });

    const updateUseCase = makeUserUpdateUseCase();

    try {
        const { name, password } = updateBodySchema.parse(request.body);
        const { userEmail } = updateParamsSchema.parse(request.params);

        const user = await updateUseCase.execute(userEmail, { name, password });

        return response.status(200).send(user);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return response.status(404).send({ message: error.message });
        }

        next(error);
    }

}