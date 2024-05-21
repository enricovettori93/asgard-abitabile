import {Location, Reservation} from "@prisma/client";
import {LocationReserveForm, ReservationWithUser} from "@/types/location";
import betterFetch from "@/utils/fetch";

interface ReservationServiceInterface {
    createReservation(locationId: Location["id"], payload: LocationReserveForm): Promise<Reservation>
    getFull(locationId: Location["id"], id: Reservation["id"]): Promise<ReservationWithUser>
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
}

export default new ReservationService();
