import {useState} from "react";
import {LocationReserveForm} from "@/types/location";
import ReservationService from "@/services/reservation.service";
import {Location} from "@prisma/client";
import toast from "react-hot-toast";

const useCreateReservation = () => {
    const [loading, setLoading] = useState(false);

    const createReservation = async (locationId: Location["id"], payload: LocationReserveForm) => {
        try {
            setLoading(true);
            await ReservationService.createReservation(locationId, payload);
            toast.success("Prenotazione creata con successo");
        } catch (e: any) {
            toast.error(e.message || "Impossibile creare la prenotazione");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        createReservation
    }
}

export default useCreateReservation;
