import {useEffect} from "react";
import {Location} from "@prisma/client";
import toast from "react-hot-toast";
import ReservationService from "@/services/reservation.service";
import {useQuery} from "@tanstack/react-query";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";

const useGetReservations = (id: Location["id"], {startDate, endDate}: {startDate: Date | null, endDate: Date | null}) => {
    const {data: reservations, isPending: loading, error} = useQuery({
        queryKey: [QUERY_CLIENT_KEYS.MY_RESERVATIONS, id, startDate, endDate],
        queryFn: () => ReservationService.getBetweenDates(id, startDate!, endDate!),
        initialData: [],
        enabled: !!startDate && !!endDate
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Errore durante il recupero delle prenotazioni");
        }
    }, [error]);

    return {
        loading,
        reservations
    }
}

export default useGetReservations;
