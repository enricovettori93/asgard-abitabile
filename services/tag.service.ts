import {Tag, Location} from "@prisma/client";
import betterFetch from "@/utils/fetch";

interface TagServiceInterface {
    getAllTags(): Promise<Tag[]>
    linkTagToLocation(locationId: Location["id"], tagId: Tag["id"]): Promise<void>
    unlinkTagFromLocation(locationId: Location["id"], tagId: Tag["id"]): Promise<void>
}

class TagService implements TagServiceInterface {
    async getAllTags(): Promise<Tag[]> {
        return (await betterFetch<Tag[]>("tags")).data as Tag[];
    }

    async linkTagToLocation(locationId: Location["id"], tagId: Tag["id"]): Promise<void> {
        await betterFetch(`users/me/locations/${locationId}/tags/${tagId}`, {
            method: "PATCH"
        });
    }

    async unlinkTagFromLocation(locationId: Location["id"], tagId: Tag["id"]): Promise<void> {
        await betterFetch(`users/me/locations/${locationId}/tags/${tagId}`, {
            method: "DELETE"
        });
    }
}

export default new TagService();
