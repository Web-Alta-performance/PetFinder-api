import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { NotFoundError } from "../errors/not-found-error";


export class PetDisableUseCase {
    constructor(private petRepository: PetsRepository) {}

    async execute(petId: string): Promise<void> {
        const pet = await this.petRepository.disable(petId);
        if (!pet) throw new NotFoundError();
    }
}