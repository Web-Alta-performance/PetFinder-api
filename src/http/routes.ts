import { Router } from "express";
const appRoutes = Router();

appRoutes.get('/', (_, reply) => reply.status(200).send('Hello, world!'));
export { appRoutes };