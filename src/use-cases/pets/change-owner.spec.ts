import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { PetChangeOwnerUseCase } from './change-owner';
import { NotFoundError } from '../errors/not-found-error';

let repository: InMemoryPetsRepository;
let sut: PetChangeOwnerUseCase;

describe('Pet Change Owner Use Case', () => {
    beforeEach(() => {
        repository = new InMemoryPetsRepository();
        sut = new PetChangeOwnerUseCase(repository);
    });

    it('should be able to change the owner of a pet', async () => {
        const pet = await repository.create({
            name: 'pet',
            size: 'small',
            userId: 'user-1'
        });

        await sut.execute(pet.id, 'user-2');

        expect(pet.userId).toEqual('user-2');
    });

    it('should not be able to execute on a pet that does not exist', async () => {
        await repository.create({
            name: 'pet',
            size: 'small',
            userId: 'user-1',
        });

        await expect(sut.execute('invalid-pet', 'user-1')).rejects.toBeInstanceOf(NotFoundError);
    });
});