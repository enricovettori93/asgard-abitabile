import {useQuery} from "@tanstack/react-query";
import LocationService from "@/services/location.service";
import {QUERY_CLIENT_KEYS} from "@/utils/constants";

const useMyLocations = () => {
    const {data: locations, isPending, isError} = useQuery({
        queryKey: [QUERY_CLIENT_KEYS.MY_LOCATIONS],
        queryFn: LocationService.getMine,
        initialData: []
    });

    return {
        isPending,
        locations,
        isError
    }
}

export default useMyLocations;
