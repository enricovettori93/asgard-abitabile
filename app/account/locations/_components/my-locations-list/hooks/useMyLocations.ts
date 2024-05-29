import betterFetch from "@/utils/fetch";
import {LocationWithPictures} from "@/types/location";
import {useState} from "react";
import toast from "react-hot-toast";

const useMyLocations = () => {
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState<LocationWithPictures[]>([]);

    const getMyLocations = async () => {
        try {
            setLoading(true);
            const {data = []} = await betterFetch<LocationWithPictures[]>("users/me/locations");
            setLocations(data);
        } catch (e: any) {
            toast.error(e.message || "Impossibile caricare le location");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        locations,
        getMyLocations
    }
}

export default useMyLocations;
