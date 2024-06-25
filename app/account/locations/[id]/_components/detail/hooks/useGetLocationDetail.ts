import {useState} from "react";
import {LocationWithPicturesAndUserAndTags} from "@/types/location";
import LocationService from "@/services/location.service";
import {Location} from "@prisma/client";
import toast from "react-hot-toast";

const useGetLocationDetail = () => {
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<LocationWithPicturesAndUserAndTags | null>(null);

    const getLocationDetail = async (id: Location["id"]) => {
        try {
            setLoading(true);
            const data = await LocationService.getDetail(id);
            setLocation(data);
        } catch (e: any) {
            toast.error(e.message || "Impossibile caricare la location");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        location,
        getLocationDetail
    }
}

export default useGetLocationDetail;
