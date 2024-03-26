import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetCreateUseCase } from "../create";

export function makePetCreateUseCase() {
    const repository = new PrismaPetsRepository();
    const useCase = new PetCreateUseCase(repository);
    
    return useCase;
}