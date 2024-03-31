import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserGetUseCase } from "../get";

export function makeUserGetUseCase() {
    const repository = new PrismaUsersRepository();
    const useCase = new UserGetUseCase(repository);
    
    return useCase;
}