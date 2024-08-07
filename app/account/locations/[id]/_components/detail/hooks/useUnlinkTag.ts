import TagService from "@/services/tag.service";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Tag, Location} from "@prisma/client";
import toast from "react-hot-toast";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";
import {LocationWithPicturesAndReservationsAndTags} from "@/types/location";

const useUnlinkTag = () => {
    const queryClient = useQueryClient();
    const {isPending: loading, mutateAsync: unlinkTag} = useMutation({
        mutationFn: async ({locationId, tagId}: { locationId: Location["id"]; tagId: Tag["id"] }) => await TagService.unlinkTagFromLocation(locationId, tagId),
        onError: (e: any) => {
            toast.error(e.message || "Impossibile rimuovere il tag");
        },
        onMutate: async ({ locationId, tagId}) => {
            const locationCache = queryClient.getQueryData([QUERY_CLIENT_KEYS.MY_LOCATIONS, locationId]) as LocationWithPicturesAndReservationsAndTags;
            locationCache.tags = locationCache.tags.filter(tag => tag.id !== tagId);
            queryClient.setQueryData([QUERY_CLIENT_KEYS.MY_LOCATIONS, locationId], locationCache);
        },
        onSuccess: async () => {
            toast.success("Tag rimosso con successo");
        }
    });

    return {
        loading,
        unlinkTag,
    }
}

export default useUnlinkTag;
