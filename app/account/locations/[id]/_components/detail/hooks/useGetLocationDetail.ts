import {useEffect} from "react";
import LocationService from "@/services/location.service";
import {Location} from "@prisma/client";
import toast from "react-hot-toast";
import {useQuery} from "@tanstack/react-query";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";

const useGetLocationDetail = (id: Location["id"]) => {
    const {data: location, isPending, error} = useQuery({
        queryKey: [QUERY_CLIENT_KEYS.MY_LOCATIONS, id],
        queryFn: () => LocationService.getDetail(id),
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Impossibile caricare la location");
        }
    }, [error]);

    return {
        isPending,
        location,
    }
}

export default useGetLocationDetail;
