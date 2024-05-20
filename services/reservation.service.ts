import {Location, Reservation} from "@prisma/client";
import {LocationReserveForm} from "@/types/location";
import betterFetch from "@/utils/fetch";

interface ReservationServiceInterface {
    createReservation(locationId: Location["id"], payload: LocationReserveForm): Promise<Reservation>
}

class ReservationService implements ReservationServiceInterface {
    async createReservation(locationId: Location["id"], payload: LocationReserveForm): Promise<Reservation> {
        return (await betterFetch<Reservation>(`locations/${locationId}/reservations`, {
            method: "POST",
            body: JSON.stringify(payload)
        })).data as Reservation;
    }
}

export default new ReservationService();
