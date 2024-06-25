import {
    AddLocation,
    EditLocationForm,
    LocationWithPictures,
    LocationWithPicturesAndReservationsAndTags,
    LocationWithPicturesAndUserAndTags,
} from "@/types/location";
import {Location, User} from "@prisma/client";
import prisma from "@/prisma/client";
import {ADULTS_PER_NIGHT, PAGE_SIZE, SEARCH_RADIUS} from "@/utils/constants";
import {PaginationParams, LocationFilters} from "@/types/common";
import NotFound from "@/errors/not-found";

interface RepositoryInterface {
    getAllByUser: (userId: User["id"]) => Promise<{data: LocationWithPictures[], count: number}>
    getAll: (params: PaginationParams) => Promise<{data: LocationWithPictures[], count: number}>
    getAllPublished: (params: PaginationParams) => Promise<{data: LocationWithPictures[], count: number}>
    filter: (params: LocationFilters & PaginationParams) => Promise<{data: LocationWithPictures[], count: number}>
    get: (id: Location["id"]) => Promise<LocationWithPicturesAndUserAndTags | null>
    getWithReservations: (id: Location["id"]) => Promise<LocationWithPicturesAndReservationsAndTags | null>
    add: (payload: AddLocation) => Promise<LocationWithPicturesAndUserAndTags>
    delete: (id: Location["id"]) => Promise<void>
    update: (id: Location["id"], payload: Omit<EditLocationForm, "pictures">) => Promise<LocationWithPicturesAndUserAndTags>
}

class LocationRepository implements RepositoryInterface {
    async add(payload: AddLocation): Promise<LocationWithPicturesAndUserAndTags> {
        return prisma.location.create({
            data: {
                ...payload,
                description: JSON.parse(payload.description as string)
            },
            include: {
                pictures: true,
                tags: true,
                user: {
                    omit: {
                        password: true
                    }
                }
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

    async get(id: Location["id"]): Promise<LocationWithPicturesAndUserAndTags> {
        const data = await prisma.location.findUnique({
            where: {
                id
            },
            include: {
                pictures: true,
                tags: true,
                user: {
                    omit: {
                        password: true
                    }
                }
            }
        });

        if (!data) throw new NotFound();

        return data;
    }

    async getWithReservations(id: Location["id"]): Promise<LocationWithPicturesAndReservationsAndTags> {
        const data = await prisma.location.findUnique({
            where: {
                id
            },
            include: {
                pictures: true,
                tags: true,
                user: {
                    omit: {
                        password: true
                    }
                },
                reservations: true
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

    async filter({skip = 0, maxAdultsForNight = 0, priceForNight = 0, lat = 0, lng = 0} = {}): Promise<{data: LocationWithPictures[], count: number}> {
        const whereConditions: any = {
            published: true,
        }

        if (maxAdultsForNight >= ADULTS_PER_NIGHT.MIN && maxAdultsForNight <= ADULTS_PER_NIGHT.MAX) {
            whereConditions.maxAdultsForNight = {
                gte: maxAdultsForNight
            }
        }

        if (priceForNight > 0) {
            whereConditions.priceForNight = {
                lt: priceForNight
            }
        }

        if (lat && lng) {
            whereConditions.lat = {
                gte: lat - SEARCH_RADIUS,
                lte: lat + SEARCH_RADIUS
            };
            whereConditions.lng = {
                gte: lng - SEARCH_RADIUS,
                lte: lng + SEARCH_RADIUS
            };
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

    async update(id: Location["id"], payload: Omit<EditLocationForm, "pictures">): Promise<LocationWithPicturesAndUserAndTags> {
        return prisma.location.update({
            where: {
                id: id
            },
            data: {
                ...payload,
                description: JSON.parse(payload.description as string)
            },
            include: {
                pictures: true,
                tags: true,
                user: {
                    omit: {
                        password: true
                    }
                }
            }
        });
    }

    async getAllByUser(userId: User["id"]): Promise<{data: LocationWithPicturesAndReservationsAndTags[], count: number}> {
        const count = await prisma.location.count({
            where: {
                userId
            }
        });

        const data = await prisma.location.findMany({
            include: {
                pictures: true,
                reservations: true,
                tags: true
            },
            where: {
                userId
            }
        });

        return {count, data};
    }
}

export default new LocationRepository();
