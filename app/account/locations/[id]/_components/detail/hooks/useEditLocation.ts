import LocationService from "@/services/location.service";
import {EditLocationForm} from "@/types/location";
import {useState} from "react";
import {Location} from "@prisma/client";
import {ValidationErrors} from "@/types/common";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";

const useEditLocation = (id: Location["id"]) => {
    const queryClient = useQueryClient();
    const [errors, setErrors] = useState<ValidationErrors>({});

    const {isPending: loading, mutateAsync: editLocation} = useMutation({
        mutationFn: async ({id: locationId, payload}: { id: Location["id"]; payload: EditLocationForm }) => {
            const { pictures = [], ...rest } = payload;
            const { id} = await LocationService.update(locationId, rest);
            if (pictures?.length > 0) {
                await LocationService.addPictures(id, pictures);
            }
        },
        onError: (e: any) => {
            toast.error(e.message || "Impossibile aggiornare la location");
            setErrors(e.cause);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_CLIENT_KEYS.MY_LOCATIONS, id]});
            toast.success("Location aggiornata con successo");
        }
    });

    return {
        loading,
        errors,
        editLocation
    };
}

export default useEditLocation;
