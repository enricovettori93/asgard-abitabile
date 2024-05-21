import {Location, Reservation, User} from "@prisma/client";
import {AddReservation, ReservationWithLocation, ReservationWithUser} from "@/types/reservation";
import prisma from "@/prisma/client";
import NotFound from "@/errors/not-found";

interface RepositoryInterface {
    createReservation(payload: AddReservation): Promise<Reservation>
    get(id: Reservation["id"]): Promise<Reservation>
    getFull(id: Reservation["id"]): Promise<ReservationWithUser>
    getAllByUser(id: User["id"]): Promise<ReservationWithLocation[]>
    getReservationBetweenDate(locationId: Location["id"], startDate: Date, endDate: Date): Promise<Reservation[]>
    delete(id: Reservation["id"]): Promise<void>
}

class ReservationRepository implements RepositoryInterface {
    async createReservation(payload: AddReservation): Promise<Reservation> {
        return prisma.reservation.create({
            data: payload
        });
    }

    async get(id: Reservation["id"]): Promise<Reservation> {
        const data = await prisma.reservation.findUnique({
            where: {
                id
            }
        });

        if (!data) throw new NotFound();

        return data;
    }

    async getFull(id: Reservation["id"]): Promise<ReservationWithUser> {
        const data = await prisma.reservation.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        });

        if (!data) throw new NotFound();

        return data;
    }

    async getReservationBetweenDate(locationId: Location["id"], startDate: Date, endDate: Date): Promise<Reservation[]> {
        return prisma.reservation.findMany({
            where: {
                locationId,
                OR: [
                    {
                        AND: [
                            {
                                startDate: {
                                    gte: startDate
                                }
                            },
                            {
                                startDate: {
                                    lte: endDate
                                }
                            },
                            {
                                endDate: {
                                    gte: endDate
                                }
                            }
                        ]
                    },
                    {
                        AND: [
                            {
                                startDate: {
                                    lte: startDate
                                }
                            },
                            {
                                endDate: {
                                    gte: startDate
                                }
                            },
                            {
                                endDate: {
                                    lte: endDate
                                }
                            }
                        ]
                    },
                    {
                        AND: [
                            {
                                startDate: {
                                    lte: startDate
                                }
                            },
                            {
                                endDate: {
                                    gte: endDate
                                }
                            }
                        ]
                    },
                    {
                        AND: [
                            {
                                startDate: {
                                    gte: startDate
                                }
                            },
                            {
                                endDate: {
                                    lte: endDate
                                }
                            }
                        ]
                    }
                ]
            }
        });
    }

    async getAllByUser(id: User["id"]): Promise<ReservationWithLocation[]> {
        return prisma.reservation.findMany({
            where: {
                userId: id
            },
            include: {
                location: true
            }
        });
    }

    async delete(id: Reservation["id"]): Promise<void> {
        await prisma.reservation.delete({
            where: {
                id
            }
        });
    }
}

export default new ReservationRepository();
