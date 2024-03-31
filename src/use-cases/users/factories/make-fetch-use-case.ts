import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserFetchUseCase } from "../fetch";

export function makeUserFetchUseCase() {
    const repository = new PrismaUsersRepository();
    const useCase = new UserFetchUseCase(repository);
    
    return useCase;
}