import ReservationService from "@/services/reservation.service";
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";

const useConfirmReservation = () => {
    const {isPending, mutateAsync: confirmReservation} = useMutation({
        mutationFn: ReservationService.confirm,
        onSuccess: () => {
            toast.success("Prenotazione confermata");
        },
        onError: (error) => {
            toast.error(error.message || "Impossibile confermare la prenotazione");
        },
        onSettled: () => {
            // TODO: invalidate query
        }
    });

    return {
        isPending,
        confirmReservation
    }
}

export default useConfirmReservation;
