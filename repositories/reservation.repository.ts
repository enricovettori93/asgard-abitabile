import {Location, Reservation} from "@prisma/client";
import {AddReservation, ReservationWithUser} from "@/types/location";
import prisma from "@/prisma/client";
import NotFound from "@/errors/not-found";

interface RepositoryInterface {
    createReservation(payload: AddReservation): Promise<Reservation>
    get(id: Reservation["id"]): Promise<Reservation>
    getFull(id: Reservation["id"]): Promise<ReservationWithUser>
    getReservationBetweenDate(locationId: Location["id"], startDate: Date, endDate: Date): Promise<Reservation[]>
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
}

export default new ReservationRepository();
