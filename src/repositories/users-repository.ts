import { Prisma, User } from '@prisma/client';

export interface UserUpdateParams {
    password_hash?: string,
    name?: string,
    phone_number?: string
}

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    remove(userId: string): Promise<boolean>
    fetch(): Promise<User[]>
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    update(email: string, data: UserUpdateParams): Promise<User | null>
}