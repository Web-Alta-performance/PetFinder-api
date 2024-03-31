import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserFetchUseCase } from './fetch';

let repository: InMemoryUsersRepository;
let sut: UserFetchUseCase;

describe('User Fetch Use Case', () => {
    beforeEach(() => {
        repository = new InMemoryUsersRepository();
        sut = new UserFetchUseCase(repository);
    });

    it('should list all users', async () => {
        await repository.create({
            name: 'test',
            email: 'test@email.com',
            password_hash: 'password_hash'
        });

        const { users } = await sut.execute();
        expect(users.length).toEqual(1);
    });

    it('should list an empty array, even if there are no users', async () => {
        const { users } = await sut.execute();
        expect(users).toEqual([]);
    });
});