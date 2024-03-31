import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { NotFoundError } from "../errors/not-found-error";

export class PetChangeOwnerUseCase {
    constructor (private petRepository: PetsRepository) {}

    async execute(petId: string, newUserId: string): Promise<void> {
        const pet = await this.petRepository.changeOwner(petId, newUserId);
        if (!pet) throw new NotFoundError();
    }
}