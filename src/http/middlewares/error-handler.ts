import { env } from "@/env";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const errorHandler: ErrorRequestHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        return response
            .status(400)
            .send({
                message: 'Validation error.',
                issues: error.format()
            });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    }

    return response.status(500).send({ message: 'Internal server error.' });
};

export { errorHandler };