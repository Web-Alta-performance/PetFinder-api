import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { NotFoundError } from "../errors/not-found-error";

interface PetDisableUseCaseResponse {
    pet: Pet | null
}

export class PetDisableUseCase {
    constructor(private petRepository: PetsRepository) {}

    async execute(petId: string): Promise<PetDisableUseCaseResponse> {
        const pet = await this.petRepository.disable(petId);
        if (!pet) throw new NotFoundError();
        
        return {
            pet
        };
    }
}