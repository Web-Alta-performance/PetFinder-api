import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAuthenticateUseCase } from "../authenticate";

export function makeUserAuthenticateUseCase() {
    const repository = new PrismaUsersRepository();
    const useCase = new UserAuthenticateUseCase(repository);

    return useCase;
}