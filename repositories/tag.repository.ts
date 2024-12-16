import {Tag, Location} from "@prisma/client";
import prisma from "@/prisma/client";

interface RepositoryInterface {
    getAll(): Promise<Tag[]>
    linkTagToLocation(tagId: Tag["id"], locationId: Location["id"]): Promise<void>;
    linkTagsToLocation(tagIds: Tag["id"][], locationId: Location["id"]): Promise<void>;
    unlinkTagFromLocation(tagId: Tag["id"], locationId: Location["id"]): Promise<void>;
}

class TagRepository implements RepositoryInterface {
    async getAll(): Promise<Tag[]> {
        return prisma.tag.findMany();
    }

    async linkTagsToLocation(tagIds: Tag["id"][], locationId: Location["id"]): Promise<void> {
        await prisma.location.update({
            where: {
                id: locationId,
            },
            data: {
                tags: {
                    set: tagIds.map(tagId => ({id: tagId}))
                }
            }
        });
    }

    async linkTagToLocation(tagId: Tag["id"], locationId: Location["id"]): Promise<void> {
        await prisma.location.update({
            where: {
                id: locationId,
            },
            data: {
                tags: {
                    set: [{
                        id: tagId
                    }]
                }
            }
        });
    }

    async unlinkTagFromLocation(tagId: Tag["id"], locationId: Location["id"]): Promise<void> {
        await prisma.location.update({
            where: {
                id: locationId,
            },
            data: {
                tags: {
                    disconnect: {
                        id: tagId
                    }
                }
            }
        });
    }
}

export default new TagRepository();
