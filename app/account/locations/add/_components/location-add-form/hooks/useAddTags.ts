import TagService from "@/services/tag.service";
import {useMutation} from "@tanstack/react-query";
import {Tag, Location} from "@prisma/client";
import toast from "react-hot-toast";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";

const useLinkTag = () => {
    const {isPending: loading, mutateAsync: addTags} = useMutation({
        mutationKey: [QUERY_CLIENT_KEYS.LINK_TAGS],
        mutationFn: async ({ id, payload }: { id: Location["id"]; payload: Tag["id"][] }) => await TagService.linksTagToLocation(id, payload),
        onError: (e: any) => {
            toast.error(e.message || "Impossibile aggiungere i tags");
        },
        throwOnError: true
    });

    return {
        loading,
        addTags,
    }
}

export default useLinkTag;
