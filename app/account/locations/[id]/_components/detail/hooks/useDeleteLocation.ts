import toast from "react-hot-toast";
import LocationService from "@/services/location.service";
import {useRouter} from "next/navigation";
import {QUERY_CLIENT_KEYS, ROUTES} from "@/utils/constants";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Location} from "@prisma/client";

const useDeleteLocation = (id: Location["id"]) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const {isPending, mutate: deleteLocation} = useMutation({
        mutationFn: LocationService.delete,
        onSuccess: () => {
            toast.success("Location eliminata con successo");
            router.push(ROUTES.MY_LOCATIONS);
        },
        onError: (error) => {
            toast.error(error.message || "Impossibile eliminare la location");
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_CLIENT_KEYS.MY_LOCATIONS, id] });
        }
    });

    return {
        isPending,
        deleteLocation
    }
}

export default useDeleteLocation;
