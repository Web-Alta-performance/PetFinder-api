import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface CreateUseCaseParams {
    name: string,
    email: string,
    password: string,
    phone_number?: string
}

interface CreateUseCaseResponse {
    user: User
}

export class UserCreateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: CreateUseCaseParams): Promise<CreateUseCaseResponse> {
        const alreadyExists = await this.usersRepository.findByEmail(email);
        if (alreadyExists) {
            throw new UserAlreadyExistsError;
        }

        const password_hash = await hash(password, 6);

        const user = await this.usersRepository.create({ name, email, password_hash });

        return {
            user
        };
    }
}