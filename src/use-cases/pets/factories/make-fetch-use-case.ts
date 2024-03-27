import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetFetchUseCase } from "../fetch";

export function makePetFetchUseCase() {
    const repository = new PrismaPetsRepository();
    const useCase = new PetFetchUseCase(repository);
    
    return useCase;
}