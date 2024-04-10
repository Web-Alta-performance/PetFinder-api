import { prisma } from "@/lib/prisma";
import { ApiRepository } from "../api-repository";
import { Prisma } from "@prisma/client";

export class PrismaApiRepository implements ApiRepository {
    async fetchCollections(): Promise<Prisma.JsonObject> {
        const collections = await prisma.$runCommandRaw({ listCollections: 1 });
        return collections;
    }
}