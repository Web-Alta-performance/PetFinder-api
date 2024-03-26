import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetFindAllUseCase } from "../find-all";

export function makePetFindAllUseCase() {
    const repository = new PrismaPetsRepository();
    const useCase = new PetFindAllUseCase(repository);
    
    return useCase;
}