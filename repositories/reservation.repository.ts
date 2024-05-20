import {Reservation} from "@prisma/client";
import {AddReservation} from "@/types/location";
import prisma from "@/prisma/client";

interface RepositoryInterface {
    createReservation(payload: AddReservation): Promise<Reservation>
}

class ReservationRepository implements RepositoryInterface {
    async createReservation(payload: AddReservation): Promise<Reservation> {
        return prisma.reservation.create({
            data: payload
        });
    }
}

export default new ReservationRepository();
