"use client"

import {useState} from "react";
import ReservationService from "@/services/reservation.service";
import {ReservationWithLocation} from "@/types/reservation";

const useMyReservations = () => {
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState<ReservationWithLocation[]>([]);

    const getMyReservations = async () => {
        try {
            setLoading(true);
            const data = [] = await ReservationService.getAllByUser();
            setReservations(data);
        } catch (e) {
            // todo: toast
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        reservations,
        getMyReservations
    }
}

export default useMyReservations;
