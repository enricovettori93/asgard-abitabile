import {AddLocation, LocationWithPictures, LocationWithPicturesAndUser} from "@/types/location";
import {Location} from "@prisma/client";
import prisma from "@/prisma/client";
import {PAGE_SIZE} from "@/utils/constants";
import {PaginationParams} from "@/utils/models";

interface RepositoryInterface {
    getAll: (params: PaginationParams) => Promise<LocationWithPictures[]>
    getAllPublished: (params: PaginationParams) => Promise<LocationWithPictures[]>
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

    async getAll({skip = 0} = {}): Promise<LocationWithPictures[]> {
        return prisma.location.findMany({
            include: {
                pictures: true
            },
            skip: skip * PAGE_SIZE,
            take: PAGE_SIZE
        });
    }

    async getAllPublished({skip = 0} = {}): Promise<LocationWithPictures[]> {
        return prisma.location.findMany({
            include: {
                pictures: true
            },
            where: {
                published: true
            },
            skip: skip * PAGE_SIZE,
            take: PAGE_SIZE
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
