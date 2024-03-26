import { PetsRepository } from '@/repositories/pets-repository';
import { Pet, Prisma } from "@prisma/client";

interface CreateUseCaseParams {
    name: string,
    userId: Prisma.UserWhereUniqueInput
    size: string,
    about?: string,
    breed?: string,
    age?: number,
}

interface CreateUseCaseResponse {
    pet: Pet
}

export class PetCreateUseCase {
    constructor(private petRepository: PetsRepository) {}

    async execute({ name, userId, size, about, breed, age }: CreateUseCaseParams): Promise<CreateUseCaseResponse> {
        const pet = await this.petRepository.create({
            name,
            size,
            owner: { connect: userId },
            about,
            breed,
            age,
        });

        return {
            pet
        };
    }
}