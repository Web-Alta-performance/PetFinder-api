import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetFindUseCase } from "../find";

export function makePetFindUseCase() {
    const repository = new PrismaPetsRepository();
    const useCase = new PetFindUseCase(repository);
    
    return useCase;
}