import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { NotFoundError } from "../errors/not-found-error";

interface UserGetUseCaseResponse {
    user: User
}

export class UserGetUseCase {
    constructor(private repository: UsersRepository) {}

    async execute(userId: string): Promise<UserGetUseCaseResponse> {
        const user = await this.repository.findById(userId);
        if (!user) {
            throw new NotFoundError();
        }

        return {
            user
        }
    }
}