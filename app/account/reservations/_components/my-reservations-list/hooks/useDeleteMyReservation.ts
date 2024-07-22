"use client"

import ReservationService from "@/services/reservation.service";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";

interface props {
    handleSuccess: Function
}

const useDeleteMyReservation = ({handleSuccess}: props) => {
    const queryClient = useQueryClient();

    const {isPending, mutate: deleteReservation} = useMutation({
        mutationFn: ReservationService.delete,
        onSuccess: () => {
            toast.success("Prenotazione eliminata con successo");
            handleSuccess();
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_CLIENT_KEYS.MY_RESERVATIONS]})
        },
        onError: () => {
            toast.error("Impossibile eliminare la prenotazione");
        }
    });

    return {
        isPending,
        deleteReservation
    }
}

export default useDeleteMyReservation;
