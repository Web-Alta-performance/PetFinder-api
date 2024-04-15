import { UsersRepository } from "@/repositories/users-repository";
import { NotFoundError } from "../errors/not-found-error";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface UserUpdateRequest {
    name?: string,
    password?: string,
    phone_number?: string,
}

export class UpdateUserUseCase {
    constructor(private repository: UsersRepository) { }

    async execute(email: string, data: UserUpdateRequest): Promise<{ user: User }> {
        const { name, password, phone_number } = data;
        const password_hash = password ? await hash(password, 6) : undefined;

        const user = await this.repository.update(email, {
            name: name || undefined,
            password_hash,
            phone_number: phone_number || undefined
        });

        if (!user) {
            throw new NotFoundError();
        }

        return {
            user
        };
    }
}