import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetDisableUseCase } from "../disable";

export function makePetDisableUseCase() {
    const repository = new PrismaPetsRepository();
    const useCase = new PetDisableUseCase(repository);

    return useCase;
}