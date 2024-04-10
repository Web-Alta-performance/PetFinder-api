import { ApiRepository } from '@/repositories/api-repository';

interface FetchUseCaseResponse {
    collections: string[];
}

interface Collection {
    name: string
}

interface Cursor {
    firstBatch: Collection[]
}

interface Collections {
    cursor: Cursor;
}

export class FetchCollectionsUseCase {
    constructor(private repository: ApiRepository) { }

    async execute(): Promise<FetchUseCaseResponse> {
        const collections = await this.repository.fetchCollections() as unknown as Collections;

        if (!collections.cursor) {
            return { collections: [] }
        }
        const collectionsArray = collections.cursor.firstBatch.map(collection => collection.name);

        return {
            collections: collectionsArray
        };
    }
}