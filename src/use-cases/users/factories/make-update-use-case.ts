import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UpdateUserUseCase } from "../update";

export function makeUserUpdateUseCase() {
    const repository = new PrismaUsersRepository();
    const useCase = new UpdateUserUseCase(repository);

    return useCase;
}