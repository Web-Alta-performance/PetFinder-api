import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/use-cases/errors/not-found-error";

export class PrismaPetsRepository implements PetsRepository {
    async create({name, size, age, breed, about, userId}: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = await prisma.pet.create({
            data: {
                name,
                size,
                age,
                breed,
                about,
                owner: { connect: { id: userId }}
            }
        });
        return pet;
    }

    async disable(id: string): Promise<Pet | null> {
        
        try {
            const pet = await prisma.pet.update({
                where: { id },
                data: { active: false }
            });
            if (!pet) return null;
            return pet;
        } catch (_) {
            throw new NotFoundError()
        }

    }

    async findById(id: string): Promise<Pet | null> {
        const pet = await prisma.pet.findUnique({ where: { id }});
        return pet;
    }

    async fetch(): Promise<Pet[]> {
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