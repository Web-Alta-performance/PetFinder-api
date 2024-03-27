import { beforeEach, describe, expect, it } from 'vitest';
import { PetCreateUseCase } from './create';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { Prisma } from '@prisma/client';

let repository: InMemoryPetsRepository;
let sut: PetCreateUseCase;

describe('Pet Create Use Case', () => {

    beforeEach(() => {
        repository = new InMemoryPetsRepository();
        sut = new PetCreateUseCase(repository);
    })

    it('should be able to create a pet', async () => {
        
        const { pet } = await sut.execute({
            name: 'dog',
            size: 'medium',
            userId: { id: 'user-1' },
        })

        expect(pet.id).toBe('pet-1');
    })
});