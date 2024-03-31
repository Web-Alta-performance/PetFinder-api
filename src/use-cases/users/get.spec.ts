import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserGetUseCase } from './get';
import { NotFoundError } from '../errors/not-found-error';

let repository: InMemoryUsersRepository;
let sut: UserGetUseCase;

describe('User Get Use Case', () => {
    beforeEach(() => {
        repository = new InMemoryUsersRepository();
        sut = new UserGetUseCase(repository);
    });

    it('should be able to find an user', async () => {
        const createdUser = await repository.create({
            name: 'test',
            email: 'test@email.com',
            password_hash: 'password_hash'
        });

        const { user } = await sut.execute('user-1');
        expect(user.id).toEqual(createdUser.id);
    });

    it('should not be able to find an user using an invalid ID', async () => {
        await repository.create({
            name: 'pet',
            email: 'test@email.com',
            password_hash: 'password_hash'
        });

        await expect(sut.execute('wrong-id')).rejects.toBeInstanceOf(NotFoundError);
    });
})