import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface PetFetchUseCaseResponse {
    pets: Pet[]
}

export class PetFetchUseCase {
    constructor(private petRepository: PetsRepository) {}

    async execute(): Promise<PetFetchUseCaseResponse> {
        const pets = await this.petRepository.findAll();
        return {
            pets
        };
    }
}