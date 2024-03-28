import { Pet, Prisma } from "@prisma/client";

export interface PetCreateOptions {
    name: string,
    size: string,
    userId: string,
    age?: number,
    about?: string,
    breed?: string
} 

export interface PetsRepository {
    create(data: PetCreateOptions): Promise<Pet>
    disable(id: string): Promise<Pet | null>
    changeOwner(petId: string, userId: string): Promise<Pet | null>
    findById(id: string): Promise<Pet | null>
    fetch(): Promise<Pet[]>
}