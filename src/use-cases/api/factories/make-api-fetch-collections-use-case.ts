import { PrismaApiRepository } from "@/repositories/prisma/prisma-api-repository";
import { FetchCollectionsUseCase } from "../fetch-collections";

export function makeApiFetchCollectionsUseCase() {
    const repository = new PrismaApiRepository();
    const useCase = new FetchCollectionsUseCase(repository);

    return useCase;
}