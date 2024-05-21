import {Location, Reservation, User} from "@prisma/client";
import {LocationReserveForm} from "@/types/location";
import betterFetch from "@/utils/fetch";
import {ReservationWithLocation, ReservationWithUser} from "@/types/reservation";

interface ReservationServiceInterface {
    createReservation(locationId: Location["id"], payload: LocationReserveForm): Promise<Reservation>
    getFull(locationId: Location["id"], id: Reservation["id"]): Promise<ReservationWithUser>
    getAllByUser(userId: User["id"]): Promise<ReservationWithLocation[]>
    delete(id: Reservation["id"]): Promise<void>
}

class ReservationService implements ReservationServiceInterface {
    async createReservation(locationId: Location["id"], payload: LocationReserveForm): Promise<Reservation> {
        return (await betterFetch<Reservation>(`locations/${locationId}/reservations`, {
            method: "POST",
            body: JSON.stringify(payload)
        })).data as Reservation;
    }

    async getFull(locationId: Location["id"], id: Reservation["id"]): Promise<ReservationWithUser> {
        return (await betterFetch<ReservationWithUser>(`locations/${locationId}/reservations/${id}`)).data as ReservationWithUser;
    }

    async getAllByUser(): Promise<ReservationWithLocation[]> {
        return (await betterFetch<ReservationWithLocation[]>(`users/me/reservations`)).data as ReservationWithLocation[];
    }

    async delete(id: Reservation["id"]): Promise<void> {
        await betterFetch<void>(`users/me/reservations/${id}`, {
            method: "DELETE"
        });
    }
}

export default new ReservationService();
