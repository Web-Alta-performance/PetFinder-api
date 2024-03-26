import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserCreateUseCase } from "../create";

export function makeUserCreateUseCase() {
    const repository = new PrismaUsersRepository();
    const useCase = new UserCreateUseCase(repository);

    return useCase;
}