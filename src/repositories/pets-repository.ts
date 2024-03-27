import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
    create(data: Prisma.PetCreateInput): Promise<Pet>
    disable(id: string): Promise<Pet | null>
    changeOwner(petId: string, userId: string): Promise<Pet | null>
    findById(id: string): Promise<Pet | null>
    fetch(): Promise<Pet[]>
}