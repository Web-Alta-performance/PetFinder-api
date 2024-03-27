import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { PetGetUseCase } from './get';
import { NotFoundError } from '../errors/not-found-error';

let repository: InMemoryPetsRepository;
let sut: PetGetUseCase;

describe('Pet Get Use Case', () => {
    beforeEach(() => {
        repository = new InMemoryPetsRepository();
        sut = new PetGetUseCase(repository);
    });

    it('should be able to find a pet', async () => {
        const createdPet = await repository.create({
            name: 'cat',
            size: 'small',
            owner: { connect: { id: 'user-1' }}
        });

        const { pet } = await sut.execute('pet-1');
        expect(pet.id).toEqual(createdPet.id);
    });

    it('should not be able to find a pet using an invalid ID', async () => {
        await repository.create({
            name: 'pet',
            size: 'size',
            owner: { connect: { id: 'user-1' }}
        });

        await expect(sut.execute('wrong-id')).rejects.toBeInstanceOf(NotFoundError);
    });
})