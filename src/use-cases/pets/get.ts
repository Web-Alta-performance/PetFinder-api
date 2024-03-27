import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { NotFoundError } from "../errors/not-found-error";

interface PetGetUseCaseResponse {
    pet: Pet
}

export class PetGetUseCase {
    constructor(private petRepository: PetsRepository) {}

    async execute(petId: string): Promise<PetGetUseCaseResponse> {
        const pet = await this.petRepository.findById(petId);
        if (!pet) throw new NotFoundError();
        
        return {
            pet
        };
    }
}