"use client"

import {useState} from "react";
import ReservationService from "@/services/reservation.service";
import {ReservationWithLocation} from "@/types/reservation";
import toast from "react-hot-toast";

const useMyReservations = () => {
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState<ReservationWithLocation[]>([]);

    const getMyReservations = async () => {
        try {
            setLoading(true);
            const data = [] = await ReservationService.getAllByUser();
            setReservations(data);
        } catch (e: any) {
            toast.error(e.message || "Impossibile caricare le prenotazioni");
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
