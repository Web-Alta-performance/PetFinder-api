import jwt, { JwtPayload } from 'jsonwebtoken'
import { env } from '@/env'
import { NextFunction, Request, Response } from 'express'

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const verifyJWT = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).send({ message: 'authorization token not provided.' });
    }

    const [, token] = authHeader.split(' '); // token comes as Bearer [token]
    try {
        const payload = await new Promise<JwtPayload>((resolve, reject) => {
            jwt.verify(token, env.SECRET_TOKEN, (error, decoded) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(decoded as JwtPayload);
                }
            });
        });

        request.userId = payload.id;
        next();
    } catch (error) {
        return response.status(401).send({ message: 'invalid token.' });
    }
}