import LocationService from "@/services/location.service";
import {EditLocationForm} from "@/types/location";
import {useState} from "react";
import {Location} from "@prisma/client";

const useEditLocation = () => {
    const [loading, setLoading] = useState(false);
    const editLocation = async (locationId: Location["id"], payload: EditLocationForm) => {
        try {
            setLoading(true);
            const { pictures = [], ...rest } = payload;
            const { id} = await LocationService.update(locationId, rest);
            if (pictures?.length > 0) {
                await LocationService.addPictures(id, pictures);
            }
        } catch (error) {
            // todo: toast
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        editLocation
    };
}

export default useEditLocation;
