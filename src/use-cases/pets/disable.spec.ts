import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { PetDisableUseCase } from './disable';
import { NotFoundError } from '../errors/not-found-error';

let repository: InMemoryPetsRepository;
let sut: PetDisableUseCase;

describe('Pet Disable Use Case', () => {
    beforeEach(() => {
        repository = new InMemoryPetsRepository;
        sut = new PetDisableUseCase(repository);
    })

    it('Should disable a pet', async () => {
        const pet = await repository.create({
            name: 'pet',
            size: 'size',
            owner: { connect: { id: 'user' }}
        });

        await sut.execute(pet.id);
        expect(pet.active).toBe(false);
    });

    it('should not be able to list an disabled group', async () => {
        const pet = await repository.create({
            name: 'pet',
            size: 'size',
            owner: { connect: { id: 'user' }}
        });

        await sut.execute(pet.id);
        
        const pets = await repository.fetch();
        expect(pets.length).toBe(0);
    });

    it('should not be able to disable an already disabled pet', async () => {
        const pet = await repository.create({
            name: 'pet',
            size: 'size',
            owner: { connect: { id: 'user' }}
        });

        await sut.execute(pet.id);
        await expect(sut.execute(pet.id)).rejects.toBeInstanceOf(NotFoundError);
    });
})