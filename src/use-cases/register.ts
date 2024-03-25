import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from 'bcryptjs';

interface RegisterParams {
    name: string,
    email: string,
    password: string,
    phone_number?: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterParams): Promise<RegisterUseCaseResponse> {
        const alreadyExists = await this.usersRepository.findByEmail(email);
        if (alreadyExists) {
            throw new Error('User already exists.');
        }

        const password_hash = await hash(password, 6);

        const user = await this.usersRepository.create({ name, email, password_hash });

        return {
            user
        };
    }
}