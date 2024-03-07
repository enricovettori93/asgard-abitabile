import {AddLocation} from "@/types/location";
import {Location} from "@prisma/client";
import prisma from "@/prisma/client";

interface LocationInterface {
    getAll: () => Promise<Location[]>
    get: (id: Pick<Location, "id">) => Promise<Location>
    add: (payload: AddLocation) => Promise<Location>
    delete: (id: Pick<Location, "id">) => Promise<void>
    update: (payload: Location) => Promise<Location>
}

class LocationService implements LocationInterface {
    async add(payload: AddLocation): Promise<Location> {
        return prisma.location.create({
            data: payload,
            include: {
                pictures: true,
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

    async get(id): Promise<Location> {
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

    async getAll(): Promise<Location[]> {
        return prisma.location.findMany({
            include: {
                pictures: true
            }
        });
    }

    async update(payload: Location): Promise<Location> {
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

export default new LocationService();
