import {AddLocation, LocationWithPictures, LocationWithPicturesAndUser} from "@/types/location";
import {Location} from "@prisma/client";
import prisma from "@/prisma/client";

interface RepositoryInterface {
    getAll: () => Promise<LocationWithPictures[]>
    get: (id: Pick<Location, "id">) => Promise<LocationWithPicturesAndUser>
    add: (payload: AddLocation) => Promise<LocationWithPicturesAndUser>
    delete: (id: Pick<Location, "id">) => Promise<void>
    update: (payload: Location) => Promise<LocationWithPicturesAndUser>
}

class LocationRepository implements RepositoryInterface {
    async add(payload: AddLocation): Promise<LocationWithPicturesAndUser> {
        return prisma.location.create({
            data: payload,
            include: {
                pictures: true,
                user: true
            }
        });
    }

    async delete(id): Promise<void> {
        await prisma.location.delete({
            where: {
                id
            }
        });
    }

    async get(id): Promise<LocationWithPicturesAndUser> {
        return prisma.location.findUnique({
            where: {
                id
            },
            include: {
                pictures: true,
                user: true,
            }
        });
    }

    async getAll(): Promise<LocationWithPictures[]> {
        return prisma.location.findMany({
            include: {
                pictures: true
            }
        });
    }

    async update(payload: Location): Promise<LocationWithPicturesAndUser> {
        return prisma.location.update({
            where: {
                id: payload.id
            },
            data: payload,
            include: {
                pictures: true,
                user: true,
            }
        });
    }
}

export default new LocationRepository();
