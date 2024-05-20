import {useState} from "react";
import {LocationReserveForm} from "@/types/location";
import ReservationService from "@/services/reservation.service";
import {Location} from "@prisma/client";

const useCreateReservation = () => {
    const [loading, setLoading] = useState(false);

    const createReservation = async (locationId: Location["id"], payload: LocationReserveForm) => {
        try {
            setLoading(true);
            await ReservationService.createReservation(locationId, payload);
        } catch (e) {
            // todo: toast with errors
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
