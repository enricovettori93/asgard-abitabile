import {useState} from "react";
import {LocationWithPicturesAndUser} from "@/types/location";
import LocationService from "@/services/location.service";
import {Location} from "@prisma/client";

const useGetLocationDetail = () => {
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<LocationWithPicturesAndUser | null>(null);

    const getLocationDetail = async (id: Location["id"]) => {
        try {
            setLoading(true);
            const data = await LocationService.getDetail(id);
            setLocation(data);
        } catch (e) {
            // todo toast
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
