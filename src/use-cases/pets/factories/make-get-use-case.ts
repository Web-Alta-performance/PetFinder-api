import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetGetUseCase } from "../get";

export function makePetGetUseCase() {
    const repository = new PrismaPetsRepository();
    const useCase = new PetGetUseCase(repository);
    
    return useCase;
}