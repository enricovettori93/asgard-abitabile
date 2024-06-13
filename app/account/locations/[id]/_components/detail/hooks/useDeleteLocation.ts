import {useState} from "react";
import toast from "react-hot-toast";
import {Location} from "@prisma/client";
import LocationService from "@/services/location.service";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/utils/constants";

const useDeleteLocation = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const deleteLocation = async (id: Location["id"]) => {
        try {
            setLoading(true);
            await LocationService.delete(id);
            router.push(ROUTES.MY_LOCATIONS);
            toast.success("Location eliminata con successo");
        } catch (e: any) {
            toast.error(e.message || "Impossibile eliminare la location");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        deleteLocation
    }
}

export default useDeleteLocation;
