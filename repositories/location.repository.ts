import {AddLocation, LocationWithPictures, LocationWithPicturesAndUser} from "@/types/location";
import {Location} from "@prisma/client";
import prisma from "@/prisma/client";
import {ADULTS_PER_NIGHT, PAGE_SIZE} from "@/utils/constants";
import {PaginationParams, LocationFilters} from "@/types/common";

interface RepositoryInterface {
    getAll: (params: PaginationParams) => Promise<{data: LocationWithPictures[], count: number}>
    getAllPublished: (params: PaginationParams) => Promise<{data: LocationWithPictures[], count: number}>
    filter: (params: LocationFilters & PaginationParams) => Promise<{data: LocationWithPictures[], count: number}>
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

    async getAll({skip = 0} = {}): Promise<{data: LocationWithPictures[], count: number}> {
        const count = await prisma.location.count({
            where: {
                published: true
            }
        });

        const data = await prisma.location.findMany({
            include: {
                pictures: true
            },
            skip: skip * PAGE_SIZE,
            take: PAGE_SIZE
        });

        return {count, data};
    }

    async getAllPublished({skip = 0} = {}): Promise<{data: LocationWithPictures[], count: number}> {
        const count = await prisma.location.count({
            where: {
                published: true
            }
        });

        const data = await prisma.location.findMany({
            include: {
                pictures: true
            },
            where: {
                published: true
            },
            skip: skip * PAGE_SIZE,
            take: PAGE_SIZE
        });

        return {count, data};
    }

    async filter({skip = 0, maxAdultsForNight = 0} = {}): Promise<{data: LocationWithPictures[], count: number}> {
        const whereConditions: any = {
            published: true,
        }

        if (maxAdultsForNight >= ADULTS_PER_NIGHT.MIN && maxAdultsForNight <= ADULTS_PER_NIGHT.MAX) {
            whereConditions.maxAdultsForNight = {
                lt: maxAdultsForNight
            }
        }

        const count = await prisma.location.count({
            where: whereConditions
        });

        const data = await prisma.location.findMany({
            include: {
                pictures: true
            },
            where: whereConditions,
            skip: skip * PAGE_SIZE,
            take: PAGE_SIZE
        });

        return {data, count};
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
