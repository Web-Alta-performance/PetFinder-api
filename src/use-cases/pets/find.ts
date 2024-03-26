import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface PetFindUseCaseResponse {
    pet: Pet | null
}

export class PetFindUseCase {
    constructor(private petRepository: PetsRepository) {}

    async execute(petId: string): Promise<PetFindUseCaseResponse> {
        const pet = await this.petRepository.findById(petId);
        return {
            pet
        };
    }
}