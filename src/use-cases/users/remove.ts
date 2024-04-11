import { UsersRepository } from "@/repositories/users-repository";
import { NotFoundError } from "../errors/not-found-error";

export class RemoveUserUseCase {
    constructor(private repository: UsersRepository) { }

    async execute(userId: string): Promise<void> {
        const deleted = await this.repository.remove(userId);
        if (!deleted) {
            throw new NotFoundError();
        }
    }
}