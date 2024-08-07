import TagService from "@/services/tag.service";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Tag, Location} from "@prisma/client";
import toast from "react-hot-toast";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";
import {LocationWithPicturesAndReservationsAndTags} from "@/types/location";

const useLinkTag = () => {
    const queryClient = useQueryClient();
    const {isPending: loading, mutateAsync: linkTag} = useMutation({
        mutationKey: [QUERY_CLIENT_KEYS.LINK_TAG],
        mutationFn: async ({ locationId, tagId }: { locationId: Location["id"]; tagId: Tag["id"] }) => await TagService.linkTagToLocation(locationId, tagId),
        onError: (e: any) => {
            toast.error(e.message || "Impossibile collegare il tag");
        },
        onMutate: async ({ locationId, tagId}) => {
            const tags = queryClient.getQueryData([QUERY_CLIENT_KEYS.TAGS]) as Tag[];
            const locationCache = queryClient.getQueryData([QUERY_CLIENT_KEYS.MY_LOCATIONS, locationId]) as LocationWithPicturesAndReservationsAndTags;
            locationCache.tags = [...locationCache.tags, tags.find(tag => tag.id === tagId)!];
            queryClient.setQueryData([QUERY_CLIENT_KEYS.MY_LOCATIONS, locationId], locationCache);
        },
        onSuccess: () => {
            toast.success("Tag collegato con successo");
        }
    });

    return {
        loading,
        linkTag,
    }
}

export default useLinkTag;
