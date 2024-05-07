import LocationService from "@/services/location.service";
import {AddLocationForm} from "@/types/location";
import {useState} from "react";

const useAddLocation = () => {
    const [loading, setLoading] = useState(false);
    const addLocation = async (payload: AddLocationForm) => {
        setLoading(true);
        const { pictures, ...rest } = payload;
        const { id} = await LocationService.add(rest);
        if (pictures) {
            await LocationService.addPictures(id, pictures);
        }
        setLoading(false);
        return id;
    }

    return {
        loading,
        addLocation
    };
}

export default useAddLocation;
