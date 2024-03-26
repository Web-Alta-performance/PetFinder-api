import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface PetDisableUseCaseResponse {
    pet: Pet | null
}

export class PetDisableUseCase {
    constructor(private petRepository: PetsRepository) {}

    async execute(petId: string): Promise<PetDisableUseCaseResponse> {
        const pet = await this.petRepository.disable(petId);
        return {
            pet
        };
    }
}