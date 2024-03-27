import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { PetFetchUseCase } from './fetch';

let repository: InMemoryPetsRepository;
let sut: PetFetchUseCase;

describe('Pet Fetch Use Case', () => {
    beforeEach(() => {
        repository = new InMemoryPetsRepository();
        sut = new PetFetchUseCase(repository);
    });

    it('should list all pets', async () => {
        await repository.create({
            name: 'pet1',
            size: 'size',
            owner: { connect: { id: 'user-1' }}
        });

        const { pets } = await sut.execute();
        expect(pets.length).toEqual(1);
    });

    it('should list an empty array, even if there are no pets', async () => {
        const { pets } = await sut.execute()
        expect(pets).toEqual([]);
    });
});