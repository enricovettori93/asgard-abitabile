import {Location, Reservation, User} from "@prisma/client";
import {LocationReserveForm} from "@/types/location";
import betterFetch from "@/utils/fetch";
import {ReservationWithLocation, ReservationWithUser} from "@/types/reservation";
import {mapDateToStringForInputs} from "@/utils/functions";

interface ReservationServiceInterface {
    createReservation(locationId: Location["id"], payload: LocationReserveForm): Promise<Reservation>
    getWithUser(locationId: Location["id"], id: Reservation["id"]): Promise<ReservationWithUser>
    getAllByUser(userId: User["id"]): Promise<ReservationWithLocation[]>
    getBetweenDates(locationId: Location["id"], startDate: Date, endDate: Date): Promise<Reservation[]>
    delete(id: Reservation["id"]): Promise<void>
    confirm(id: Reservation["id"]): Promise<Reservation>
}

class ReservationService implements ReservationServiceInterface {
    async createReservation(locationId: Location["id"], payload: LocationReserveForm): Promise<Reservation> {
        return (await betterFetch<Reservation>(`users/me/locations/${locationId}/reservations`, {
            method: "POST",
            body: JSON.stringify(payload)
        })).data as Reservation;
    }

    async getBetweenDates(locationId: Location["id"], startDate: Date, endDate: Date): Promise<Reservation[]> {
        return (await betterFetch<Reservation[]>(`users/me/locations/${locationId}/reservations?startDate=${mapDateToStringForInputs(startDate)}&endDate=${mapDateToStringForInputs(endDate)}`)).data as Reservation[];
    }

    async getWithUser(locationId: Location["id"], id: Reservation["id"]): Promise<ReservationWithUser> {
        return (await betterFetch<ReservationWithUser>(`users/me/locations/${locationId}/reservations/${id}`)).data as ReservationWithUser;
    }

    async getAllByUser(): Promise<ReservationWithLocation[]> {
        return (await betterFetch<ReservationWithLocation[]>(`users/me/reservations`)).data as ReservationWithLocation[];
    }

    async delete(id: Reservation["id"]): Promise<void> {
        await betterFetch<void>(`users/me/reservations/${id}`, {
            method: "DELETE"
        });
    }

    async confirm(id: Reservation["id"]): Promise<Reservation> {
        return (await betterFetch<Reservation>(`users/me/reservations/${id}/confirm`, {
            method: "PATCH"
        })).data as Reservation;
    }
}

export default new ReservationService();
