import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface FetchUseCaseResponse {
    users: User[]
}

export class UserFetchUseCase {
    constructor(private repository: UsersRepository) {}

    async execute(): Promise<FetchUseCaseResponse> {
        const users = await this.repository.fetch();
        
        return {
            users
        }
    }
}