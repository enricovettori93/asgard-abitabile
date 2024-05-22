import {useState} from "react";
import {Location, Reservation} from "@prisma/client";
import ReservationService from "@/services/reservation.service";
import {ReservationWithUser} from "@/types/reservation";

const useGetReservationDetail = () => {
    const [loading, setLoading] = useState(false);
    const [reservation, setReservation] = useState<ReservationWithUser | null>(null);

    const getReservationDetail = async (locationId: Location["id"], reservationId: Reservation["id"]) => {
        try {
            setLoading(true);
            const data = await ReservationService.getWithUser(locationId, reservationId);
            setReservation(data);
        } catch (e) {
            // todo toast
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        reservation,
        getReservationDetail
    }
}

export default useGetReservationDetail;
