"use client"

import {useState} from "react";
import ReservationService from "@/services/reservation.service";
import {ReservationWithLocation} from "@/types/reservation";
import {Reservation} from "@prisma/client";
import toast from "react-hot-toast";

const useDeleteMyReservation = () => {
    const [loading, setLoading] = useState(false);

    const deleteReservation = async (id: Reservation["id"]) => {
        try {
            setLoading(true);
            await ReservationService.delete(id);
            toast.success("Prenotazione eliminata con successo");
        } catch (e: any) {
            toast.error(e.message || "Impossibile eliminare la prenotazione");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        deleteReservation
    }
}

export default useDeleteMyReservation;
