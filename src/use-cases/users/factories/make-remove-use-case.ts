import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RemoveUserUseCase } from "../remove";

export function makeRemoveUserUseCase() {
    const repository = new PrismaUsersRepository();
    const useCase = new RemoveUserUseCase(repository);

    return useCase;
}