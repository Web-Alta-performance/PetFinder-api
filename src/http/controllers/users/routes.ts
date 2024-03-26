import { Router } from "express";
import { authenticate } from "./authenticate";
import { create } from "./create";

const userRoutes = Router();

userRoutes.post('/', create);
userRoutes.post('/auth', authenticate);

export { userRoutes };