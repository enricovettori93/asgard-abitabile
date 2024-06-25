import {useState} from "react";
import TagService from "@/services/tag.service";
import toast from "react-hot-toast";
import {Tag} from "@prisma/client";

const useGetTags = () => {
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState<Tag[]>([]);

    const getTags = async () => {
        try {
            setLoading(true);
            const data = await TagService.getAllTags();
            setTags(data);
        } catch (e: any) {
            toast.error(e.message || "Impossibile caricare i tag");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        getTags,
        tags
    }
}

export default useGetTags;
