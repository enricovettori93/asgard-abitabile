import {Location, Picture} from "@prisma/client";
import LocationService from "@/services/location.service";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";
import {LocationWithPicturesAndReservationsAndTags} from "@/types/location";

const useRemoveImage = () => {
    const queryClient = useQueryClient();
    const {isPending: loading, mutateAsync: removeImage} = useMutation({
        mutationFn: async ({locationId, pictureId}: { locationId: Location["id"]; pictureId: Picture["id"] }) => await LocationService.removePicture(locationId, pictureId),
        onError: (e: any) => {
            toast.error(e.message || "Impossibile rimuovere l'immagine");
        },
        onMutate: async ({ locationId, pictureId}) => {
            const locationCache = queryClient.getQueryData([QUERY_CLIENT_KEYS.MY_LOCATIONS, locationId]) as LocationWithPicturesAndReservationsAndTags;
            locationCache.pictures = locationCache.pictures.filter(picture => picture.id !== pictureId);
            queryClient.setQueryData([QUERY_CLIENT_KEYS.MY_LOCATIONS, locationId], locationCache);
        },
    });

    return {
        loading,
        removeImage
    }
}

export default useRemoveImage;
