import LocationService from "@/services/location.service";
import {useState} from "react";
import toast from "react-hot-toast";
import {ValidationErrors} from "@/types/common";
import {useMutation} from "@tanstack/react-query";
import {Location} from "@prisma/client";
import {LocationPicturesPayload} from "@/types/location";

const useAddPictures = () => {
    const [errors, setErrors] = useState<ValidationErrors>({});

    const {isPending, mutateAsync: addPictures} = useMutation({
        mutationFn: ({id, payload}: { id: Location["id"]; payload: LocationPicturesPayload }) => LocationService.addPictures(id, payload),
        onError: (e: any) => {
            setErrors(e.cause);
            toast.error(e.message || "Errore durante l'aggiunta delle immagini");
        }
    });

    return {
        isPending,
        errors,
        addPictures
    };
}

export default useAddPictures;
