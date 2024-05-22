import {useState} from "react";
import {Location, Picture} from "@prisma/client";
import LocationService from "@/services/location.service";
import toast from "react-hot-toast";

const useRemoveImage = () => {
    const [loading, setLoading] = useState(false);

    const removeImage = async (locationId: Location["id"], pictureId: Picture["id"]) => {
        try {
            setLoading(true);
            await LocationService.removePicture(locationId, pictureId);
            toast.success("Immagine rimossa con successo");
        } catch (e: any) {
            toast.error(e.message || "Impossibile rimuovere l'immagine");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        removeImage
    }
}

export default useRemoveImage;
