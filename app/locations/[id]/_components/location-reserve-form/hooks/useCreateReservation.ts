import {useState} from "react";
import {LocationReserveForm} from "@/types/location";
import ReservationService from "@/services/reservation.service";
import {Location} from "@prisma/client";
import toast from "react-hot-toast";
import {ValidationErrors} from "@/types/common";

const useCreateReservation = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const createReservation = async (locationId: Location["id"], payload: LocationReserveForm) => {
        try {
            setLoading(true);
            await ReservationService.createReservation(locationId, payload);
            toast.success("Prenotazione creata con successo");
        } catch (e: any) {
            setErrors(e.cause);
            toast.error(e.message || "Impossibile creare la prenotazione");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        errors,
        createReservation
    }
}

export default useCreateReservation;
