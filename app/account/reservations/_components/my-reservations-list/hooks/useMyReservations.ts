"use client"

import ReservationService from "@/services/reservation.service";
import toast from "react-hot-toast";
import {useQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";

const useMyReservations = () => {
    const {isPending, error, data: reservations} = useQuery({
        queryKey: [QUERY_CLIENT_KEYS.MY_RESERVATIONS],
        queryFn: ReservationService.getAllByUser,
        initialData: []
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Impossibile caricare le prenotazioni");
        }
    }, [error]);

    return {
        isPending,
        reservations
    }
}

export default useMyReservations;
