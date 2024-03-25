import { Router } from "express";
import { register } from "./controllers/register";

const appRoutes = Router();

appRoutes.get('/', (_, reply) => reply.status(200).send('Hello, world!'));
appRoutes.post('/users', register);

export { appRoutes };