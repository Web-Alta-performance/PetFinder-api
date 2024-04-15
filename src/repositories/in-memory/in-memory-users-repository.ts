import { Prisma, User } from '@prisma/client';
import { UserUpdateParams, UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            phone_number: data.phone_number || null,
            created_at: new Date()
        };
        this.items.push(user);
        return user;
    }

    async remove(userId: string) {
        let count = 0;
        const filtered = this.items.filter((user) => {
            if (user.id === userId) {
                count++;
                return false;
            }
            return true;
        });

        this.items = filtered;

        return count > 0;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((item) => item.email === email);

        if (!user) return null;
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = this.items.find((item) => item.id === id);

        if (!user) return null;
        return user;
    }

    async fetch(): Promise<User[]> {
        let users = []
        for (const user of this.items) {
            users.push(user);
        }
        return users;
    }

    async update(email: string, data: UserUpdateParams): Promise<User | null> {
        for (let user of this.items) {
            if (user.email === email) {
                user.name = data.name ?? user.name;
                user.password_hash = data.password_hash ?? user.password_hash;
                user.phone_number = data.phone_number ?? user.phone_number;
                return user;
            }
        }
        return null;
    }
}