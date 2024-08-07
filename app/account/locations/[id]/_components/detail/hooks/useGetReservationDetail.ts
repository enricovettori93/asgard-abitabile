import {useEffect} from "react";
import {Location, Reservation} from "@prisma/client";
import ReservationService from "@/services/reservation.service";
import toast from "react-hot-toast";
import {useQuery} from "@tanstack/react-query";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";

const useGetReservationDetail = (locationId: Location["id"], reservationId: Reservation["id"] | null) => {
    const {data: reservation, isPending: loading, error} = useQuery({
        queryKey: [QUERY_CLIENT_KEYS.MY_RESERVATIONS_DETAIL, locationId, reservationId],
        enabled: !!reservationId,
        queryFn: () => ReservationService.getWithUser(locationId, reservationId as Reservation["id"]),
        initialData: null
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Errore durante il recupero della prenotazione");
        }
    }, [error]);

    return {
        loading,
        reservation
    }
}

export default useGetReservationDetail;
