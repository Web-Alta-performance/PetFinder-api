import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    remove(userId: string): Promise<boolean>
    fetch(): Promise<User[]>
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
}