import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface PetChangeOwnerUseCaseResponse {
    pet: Pet | null
}

export class PetChangeOwnerUseCase {
    constructor (private petRepository: PetsRepository) {}

    async execute(petId: string, userId: string): Promise<PetChangeOwnerUseCaseResponse> {
        const pet = await this.petRepository.changeOwner(petId, userId);
        return {
            pet
        };
    }
}