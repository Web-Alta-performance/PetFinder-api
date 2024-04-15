import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from 'vitest';
import { NotFoundError } from "../errors/not-found-error";
import { UpdateUserUseCase } from "./update";

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserUseCase;

describe('Update User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new UpdateUserUseCase(usersRepository);
    })

    it('should be able to update an user', async () => {
        const oldUser = await usersRepository.create({
            name: 'user',
            email: 'useremail@test.com',
            password_hash: 'somepassword',
        });

        await sut.execute(oldUser.email, { name: 'johnDoe' });

        const user = await usersRepository.findById(oldUser.id);
        expect(user?.name).toEqual('johnDoe');
    });

    it('should not be able to update an invalid user', async () => {
        await expect(sut.execute('non-existent-id', {})).rejects.toBeInstanceOf(NotFoundError);
    });
});