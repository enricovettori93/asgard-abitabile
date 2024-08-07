import ReservationService from "@/services/reservation.service";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Location, Reservation} from "@prisma/client";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";

const useConfirmReservation = () => {
    const queryClient = useQueryClient();
    const { isPending, mutateAsync: confirmReservation } = useMutation({
        mutationFn: async ({ locationId, reservationId }: { locationId: Location["id"], reservationId: Reservation["id"] }) => await ReservationService.confirm(reservationId),
        onMutate: async ({ locationId, reservationId }) => {
            const reservationCache = queryClient.getQueryData([QUERY_CLIENT_KEYS.MY_RESERVATIONS_DETAIL, locationId, reservationId]) as Reservation;
            reservationCache.confirmed = true;
            queryClient.setQueryData([QUERY_CLIENT_KEYS.MY_RESERVATIONS_DETAIL, locationId, reservationId], reservationCache);
        },
        onSuccess: async () => {
            toast.success("Prenotazione confermata");
            await queryClient.refetchQueries({
                predicate: (query) => {
                    const { queryKey } = query;
                    return queryKey[0] === QUERY_CLIENT_KEYS.MY_RESERVATIONS;
                }
            });
        },
        onError: (error) => {
            toast.error(error.message || "Impossibile confermare la prenotazione");
        }
    });

    return {
        isPending,
        confirmReservation
    }
}

export default useConfirmReservation;
