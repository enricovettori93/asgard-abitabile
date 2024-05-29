import LocationService from "@/services/location.service";
import {AddLocationForm} from "@/types/location";
import {useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {ValidationErrors} from "@/types/common";

const useAddLocation = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const addLocation = async (payload: AddLocationForm) => {
        try {
            setLoading(true);
            const { pictures, ...rest } = payload;
            const { id} = await LocationService.add(rest);
            if (pictures) {
                await LocationService.addPictures(id, pictures);
            }
            router.push(`/locations/${id}`);
            toast.success("Location aggiunta con successo");
        } catch (e: any) {
            setErrors(e.cause);
            toast.error(e.message || "Impossibile aggiungere la location");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        errors,
        addLocation
    };
}

export default useAddLocation;
