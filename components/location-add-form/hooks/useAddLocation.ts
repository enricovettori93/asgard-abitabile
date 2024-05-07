import LocationService from "@/services/location.service";
import {AddLocationForm} from "@/types/location";

const useAddLocation = () => {
    const addLocation = async (payload: AddLocationForm) => {
        const { pictures, ...rest } = payload;
        const { id} = await LocationService.add(rest);
        if (pictures) {
            await LocationService.addPictures(id, pictures);
        }
        return id;
    }

    return {
        addLocation
    };
}

export default useAddLocation;
