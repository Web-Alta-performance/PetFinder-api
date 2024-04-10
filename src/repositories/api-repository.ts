import { Prisma } from "@prisma/client";

export interface ApiRepository {
    fetchCollections(): Promise<Prisma.JsonObject>
}