import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { CreateUseCase } from "./create";
import { beforeEach, describe, expect, it } from 'vitest';
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: CreateUseCase;

describe('Create User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new CreateUseCase(usersRepository);
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'user',
            email: 'useremail@test.com',
            password: 'somepassword',
        });

        expect(user.id).toEqual('user-1');
    });

    it('should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'user',
            email: 'useremail@test.com',
            password: 'somepassword',
        });

        const isHashed = await compare('somepassword', user.password_hash);
        
        expect(isHashed).toBe(true);
    });

    it('should not be able to register with same email twice', async () => {
        const email = 'useremail@test.com';

        await sut.execute({
            name: 'user',
            email,
            password: 'somepassword',
        });

        await expect(sut.execute({
            name: 'user',
            email,
            password: 'somepassword',
        })).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});