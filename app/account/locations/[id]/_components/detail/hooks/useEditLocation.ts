import LocationService from "@/services/location.service";
import {EditLocationForm} from "@/types/location";
import {useState} from "react";
import {Location} from "@prisma/client";
import {ValidationErrors} from "@/types/common";
import toast from "react-hot-toast";

const useEditLocation = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const editLocation = async (locationId: Location["id"], payload: EditLocationForm) => {
        try {
            setLoading(true);
            const { pictures = [], ...rest } = payload;
            const { id} = await LocationService.update(locationId, rest);
            if (pictures?.length > 0) {
                await LocationService.addPictures(id, pictures);
            }
            toast.success("Location aggiornata con successo");
        } catch (e: any) {
            setErrors(e.cause);
            toast.error(e.message || "Impossibile aggiornare la location");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        errors,
        editLocation
    };
}

export default useEditLocation;
