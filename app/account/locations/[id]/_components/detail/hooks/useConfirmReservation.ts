import {useState} from "react";
import {Location, Picture, Reservation} from "@prisma/client";
import LocationService from "@/services/location.service";
import ReservationService from "@/services/reservation.service";
import toast from "react-hot-toast";

const useConfirmReservation = () => {
    const [loading, setLoading] = useState(false);

    const confirmReservation = async (reservationId: Reservation["id"]) => {
        try {
            setLoading(true);
            await ReservationService.confirm(reservationId);
            toast.success("Prenotazione confermata");
        } catch (e: any) {
            toast.error(e.message || "Impossibile confermare la prenotazione");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        confirmReservation
    }
}

export default useConfirmReservation;
