import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetCreateInput): Promise<Pet> {
        const pet = await prisma.pet.create({ data });
        return pet;
    }

    async disable(id: string): Promise<Pet | null> {
        const pet = await prisma.pet.update({
            where: { id },
            data: { active: false }
        });

        if (!pet) return null;

        return pet;
    }

    async findById(id: string): Promise<Pet | null> {
        const pet = await prisma.pet.findUnique({ where: { id }});
        return pet;
    }

    async findAll(): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({ where: { active: true }});
        return pets;
    }

    async changeOwner(petId: string, userId: string): Promise<Pet | null> {
        const pet = await prisma.pet.update({
            where: { id: petId },
            data: { userId }
        });

        return pet;
    }

}