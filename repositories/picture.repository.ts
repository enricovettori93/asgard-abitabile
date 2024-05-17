import {Location, Picture} from "@prisma/client";
import prisma from "@/prisma/client";
import {AddPicture} from "@/types/picture";
import NotFound from "@/errors/not-found";

interface RepositoryInterface {
    get: (id: Picture["id"]) => Promise<Picture>
    add: (locationId: Location["id"], payload: Picture) => Promise<Picture>
    delete: (id: Picture["id"]) => Promise<void>
    addMany: (locationId: Location["id"], payload: Picture[]) => Promise<void>
}

class PictureRepository implements RepositoryInterface {
    async add(locationId: Location["id"], payload: AddPicture): Promise<Picture> {
        const location = await prisma.location.findUnique({
            where: {
                id: locationId
            }
        });

        if (!location) throw new NotFound();

        return prisma.picture.create({
            data: {
                ...payload,
                location: {
                    connect: {
                        id: location.id
                    }
                }
            }
        });
    }

    async addMany(locationId: Location["id"], payload: AddPicture[]): Promise<void> {
        for(let picture of payload) {
            await this.add(locationId, picture);
        }
    }

    async delete(id: Picture["id"]): Promise<void> {
        await prisma.picture.delete({
            where: {
                id
            }
        });
    }

    async get(id: Picture["id"]): Promise<Picture> {
        const data = prisma.picture.findUnique({
            where: {
                id
            }
        });

        if (!data) throw new NotFound();

        return data as unknown as Picture;
    }
}

export default new PictureRepository();
