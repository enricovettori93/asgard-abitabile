import {useState} from "react";
import {Location, Picture} from "@prisma/client";
import LocationService from "@/services/location.service";

const useRemoveImage = () => {
    const [loading, setLoading] = useState(false);

    const removeImage = async (locationId: Location["id"], pictureId: Picture["id"]) => {
        try {
            setLoading(false);
            await LocationService.removePicture(locationId, pictureId);
        } catch (e) {
            // todo toast
        } finally {
            setLoading(true);
        }
    }

    return {
        loading,
        removeImage
    }
}

export default useRemoveImage;
