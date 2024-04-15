import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UsersRepository, UserUpdateParams } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({ data });
        return user;
    }

    async remove(id: string) {
        const { count } = await prisma.user.deleteMany({
            where: { id: id }
        });
        return count > 0;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
    }

    async fetch(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users;
    }

    async update(email: string, data: UserUpdateParams): Promise<User | null> {
        const user = await prisma.user.update({
            where: { email },
            data,
        });

        return user;
    }
}