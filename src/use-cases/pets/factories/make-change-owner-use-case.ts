import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetChangeOwnerUseCase } from "../change-owner";

export function makePetChangeOwnerUseCase() {
    const repository = new PrismaPetsRepository();
    const useCase = new PetChangeOwnerUseCase(repository);

    return useCase;
}