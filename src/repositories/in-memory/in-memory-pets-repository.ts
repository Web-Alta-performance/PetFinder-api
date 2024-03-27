import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = [];
    public autoIncrement = 1;

    async create(data: Prisma.PetCreateInput): Promise<Pet> {


        const pet: Pet = {
            id: `pet-${this.autoIncrement}`,
            userId: `user-${this.autoIncrement++}`,
            name: data.name,
            size: data.size,

            active: true,
            about: data.about || null,
            age: data.age || null,
            breed: data.breed || null,
        };

        this.items.push(pet);
        return pet;
    }

    async disable(petId: string): Promise<Pet | null> {
        for (const pet of this.items) {
            if (pet.id === petId && pet.active === true) {
                pet.active = false;
                return pet;
            }
        }
        return null;
    }

    async findById(id: string): Promise<Pet | null> {
        const pet = this.items.find((item) => item.id === id && item.active === true);
        
        if (!pet) return null;
        return pet;
    }
    
    async findAll(): Promise<Pet[]> {
        let pets = []
        for (const pet of this.items) {
            if (pet.active === true) {
                pets.push(pet);
            }
        }
        return pets;
    }

    async changeOwner(petId: string, userId: string): Promise<Pet | null> {
        const pet = this.items.find((item) => item.id === petId && item.active === true);
        if (!pet) return null;
        
        pet.userId = userId;
        return pet;
    }
}