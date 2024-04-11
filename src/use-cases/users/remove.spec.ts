import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from 'vitest';
import { RemoveUserUseCase } from "./remove";
import { NotFoundError } from "../errors/not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: RemoveUserUseCase;

describe('Create User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RemoveUserUseCase(usersRepository);
    })

    it('should be able to delete an user', async () => {
        const user = await usersRepository.create({
            name: 'user',
            email: 'useremail@test.com',
            password_hash: 'somepassword',
        });

        await sut.execute(user.id);

        await expect(usersRepository.findById(user.id)).resolves.toBe(null)
    });

    it('should not be able to delete an invalid user', async () => {
        await expect(sut.execute('non-existent-id')).rejects.toBeInstanceOf(NotFoundError);
    });

    it('should not list a deleted user', async () => {
        const user = await usersRepository.create({
            name: 'user',
            email: 'useremail@test.com',
            password_hash: 'somepassword',
        });

        await sut.execute(user.id);

        const users = await usersRepository.fetch();
        expect(users).toHaveLength(0);
    });
});