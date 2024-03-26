import { Router } from "express";
import { userRoutes } from "./controllers/users/routes";

const appRoutes = Router();

appRoutes.use('/users', userRoutes);

export { appRoutes };