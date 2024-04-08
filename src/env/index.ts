import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string(),
    SECRET_TOKEN: z.string(),
    NODE_ENV: z.enum(['dev', 'test', 'production']),
    PORT: z.coerce.number(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error('Invalid environment variables: ', _env.error.format());
    throw new Error('Invalid environment variables.');
}

export const env = _env.data;