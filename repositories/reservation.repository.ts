import {Reservation} from "@prisma/client";
import {AddReservation, ReservationWithUser} from "@/types/location";
import prisma from "@/prisma/client";
import NotFound from "@/errors/not-found";

interface RepositoryInterface {
    createReservation(payload: AddReservation): Promise<Reservation>
    get(id: Reservation["id"]): Promise<Reservation>
    getFull(id: Reservation["id"]): Promise<ReservationWithUser>
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
}

export default new ReservationRepository();
