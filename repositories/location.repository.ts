import {AddLocation, LocationWithPictures, LocationWithPicturesAndUser} from "@/types/location";
import {Location} from "@prisma/client";
import prisma from "@/prisma/client";

interface RepositoryInterface {
    getAll: () => Promise<LocationWithPictures[]>
    getAllPublished: () => Promise<LocationWithPictures[]>
    get: (id: Location["id"]) => Promise<LocationWithPicturesAndUser | null>
    add: (payload: AddLocation) => Promise<LocationWithPicturesAndUser>
    delete: (id: Location["id"]) => Promise<void>
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

    async delete(id: Location["id"]): Promise<void> {
        await prisma.location.delete({
            where: {
                id
            }
        });
    }

    async get(id: Location["id"]): Promise<LocationWithPicturesAndUser | null> {
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

    async getAllPublished(): Promise<LocationWithPictures[]> {
        return prisma.location.findMany({
            include: {
                pictures: true
            },
            where: {
                published: true
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
