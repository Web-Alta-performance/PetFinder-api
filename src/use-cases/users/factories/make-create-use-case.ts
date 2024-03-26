import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateUseCase } from "../create";

export function makeCreateUseCase() {
    const repository = new PrismaUsersRepository();
    const useCase = new CreateUseCase(repository);

    return useCase;
}