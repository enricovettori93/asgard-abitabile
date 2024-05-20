import {AddLocation, EditLocationForm, LocationWithPictures, LocationWithPicturesAndUser} from "@/types/location";
import {Location, User} from "@prisma/client";
import prisma from "@/prisma/client";
import {ADULTS_PER_NIGHT, PAGE_SIZE} from "@/utils/constants";
import {PaginationParams, LocationFilters} from "@/types/common";
import NotFound from "@/errors/not-found";

interface RepositoryInterface {
    getAllByUser: (userId: User["id"]) => Promise<{data: LocationWithPictures[], count: number}>
    getAll: (params: PaginationParams) => Promise<{data: LocationWithPictures[], count: number}>
    getAllPublished: (params: PaginationParams) => Promise<{data: LocationWithPictures[], count: number}>
    filter: (params: LocationFilters & PaginationParams) => Promise<{data: LocationWithPictures[], count: number}>
    get: (id: Location["id"]) => Promise<LocationWithPicturesAndUser | null>
    add: (payload: AddLocation) => Promise<LocationWithPicturesAndUser>
    delete: (id: Location["id"]) => Promise<void>
    update: (id: Location["id"], payload: Omit<EditLocationForm, "pictures">) => Promise<LocationWithPicturesAndUser>
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

    async get(id: Location["id"]): Promise<LocationWithPicturesAndUser> {
        const data = await prisma.location.findUnique({
            where: {
                id
            },
            include: {
                pictures: true,
                user: true,
            }
        });

        if (!data) throw new NotFound();

        return data;
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
            take: PAGE_SIZE,
            orderBy: {
                createdAt: 'desc'
            }
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

    async filter({skip = 0, maxAdultsForNight = 0, priceForNight = 0} = {}): Promise<{data: LocationWithPictures[], count: number}> {
        const whereConditions: any = {
            published: true,
        }

        if (maxAdultsForNight >= ADULTS_PER_NIGHT.MIN && maxAdultsForNight <= ADULTS_PER_NIGHT.MAX) {
            whereConditions.maxAdultsForNight = {
                lt: maxAdultsForNight
            }
        }

        if (priceForNight > 0) {
            whereConditions.priceForNight = {
                lt: priceForNight
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

    async update(id: Location["id"], payload: Omit<EditLocationForm, "pictures">): Promise<LocationWithPicturesAndUser> {
        return prisma.location.update({
            where: {
                id: id
            },
            data: payload,
            include: {
                pictures: true,
                user: true,
            }
        });
    }

    async getAllByUser(userId: User["id"]): Promise<{data: LocationWithPictures[], count: number}> {
        const count = await prisma.location.count({
            where: {
                userId
            }
        });

        const data = await prisma.location.findMany({
            include: {
                pictures: true
            },
            where: {
                userId
            }
        });

        return {count, data};
    }
}

export default new LocationRepository();
