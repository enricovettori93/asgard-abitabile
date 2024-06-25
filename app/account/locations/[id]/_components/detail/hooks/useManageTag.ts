import {useState} from "react";
import TagService from "@/services/tag.service";
import toast from "react-hot-toast";
import {Tag, Location} from "@prisma/client";

const useManageTag = () => {
    const [loading, setLoading] = useState(false);

    const linkTag = async (tagId: Tag["id"], locationId: Location["id"]) => {
        try {
            setLoading(true);
            await TagService.linkTagToLocation(locationId, tagId);
        } catch (e: any) {
            toast.error(e.message || "Impossibile collegare il tag");
        } finally {
            setLoading(false);
        }
    }

    const unlinkTag = async (tagId: Tag["id"], locationId: Location["id"]) => {
        try {
            setLoading(true);
            await TagService.unlinkTagFromLocation(locationId, tagId);
        } catch (e: any) {
            toast.error(e.message || "Impossibile rimuovere il tag");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        linkTag,
        unlinkTag
    }
}

export default useManageTag;
