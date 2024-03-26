import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface PetFindAllUseCaseResponse {
    pets: Pet[]
}

export class PetFindAllUseCase {
    constructor(private petRepository: PetsRepository) {}

    async execute(): Promise<PetFindAllUseCaseResponse> {
        const pets = await this.petRepository.findAll();
        return {
            pets
        };
    }
}