import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAuthenticateUseCase } from "./authenticate";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: UserAuthenticateUseCase;

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new UserAuthenticateUseCase(usersRepository);
    });

    it('Should be able to authenticate', async () => {
        await usersRepository.create({
            name: 'user',
            email: 'useremail@test.com',
            password_hash: await hash('somepassword', 6),
        });

        const { user } = await sut.execute({
            email: 'useremail@test.com',
            password: 'somepassword',
        });

        expect(user.id).toEqual('user-1');
    });

    it('Should not be able to authenticate with wrong email', async () => {
        await expect(sut.execute({
            email: 'useremail@test.com',
            password: 'somepassword',
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('Should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'user',
            email: 'useremail@test.com',
            password_hash: await hash('somepassword', 6),
        });

        await expect(sut.execute({
            email: 'useremail@test.com',
            password: 'wrongpassword',
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    })
});