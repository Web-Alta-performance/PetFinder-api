import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    disable(id: string): Promise<Pet | null>
    changeOwner(petId: string, userId: string): Promise<boolean>
    findById(id: string): Promise<Pet | null>
    fetch(): Promise<Pet[]>
}