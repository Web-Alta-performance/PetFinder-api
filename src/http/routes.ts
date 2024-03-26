import { Router } from "express";
import { create } from "./controllers/users/create";

const appRoutes = Router();

appRoutes.get('/', (_, reply) => reply.status(200).send('Hello, world!'));
appRoutes.post('/users', create);

export { appRoutes };