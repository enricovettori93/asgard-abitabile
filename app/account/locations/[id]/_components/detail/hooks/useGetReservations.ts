import {useState} from "react";
import {LocationWithPicturesAndUser} from "@/types/location";
import LocationService from "@/services/location.service";
import {Location, Reservation} from "@prisma/client";
import toast from "react-hot-toast";
import ReservationService from "@/services/reservation.service";

const useGetReservations = () => {
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const getReservations = async (id: Location["id"], {startDate, endDate}: {startDate: Date, endDate: Date}) => {
        try {
            setLoading(true);
            const data = await ReservationService.getBetweenDates(id, startDate, endDate);
            setReservations(data);
        } catch (e: any) {
            toast.error(e.message || "Impossibile caricare la location");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        reservations,
        getReservations
    }
}

export default useGetReservations;
