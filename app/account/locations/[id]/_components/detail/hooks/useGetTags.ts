import TagService from "@/services/tag.service";
import {useQuery} from "@tanstack/react-query";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";

const useGetTags = () => {
    const {data: tags, isPending, error} = useQuery({
        queryKey: [QUERY_CLIENT_KEYS.TAGS],
        queryFn: TagService.getAllTags,
        initialData: []
    });

    return {
        error,
        isPending,
        tags
    }
}

export default useGetTags;
