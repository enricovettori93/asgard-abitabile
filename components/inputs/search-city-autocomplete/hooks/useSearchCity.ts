import {useState} from "react";
import {SEARCH_BASE_URI, SEARCH_COUNTRY_CODES} from "@/utils/constants";
import toast from "react-hot-toast";
import {SearchCity} from "@/types/search";

const useSearchCity = () => {
    const [cities, setCities] = useState<SearchCity[]>([]);
    const [loading, setLoading] = useState(false);

    const searchCity = async (value: string) => {
        try {
            const res = await fetch(`${SEARCH_BASE_URI}/search?city=${value}&format=json&countrycodes=${SEARCH_COUNTRY_CODES}`);
            const data = await res.json();
            setCities(data as SearchCity[]);
        } catch (e: any) {
            toast.error("Errore durante la ricerca delle cittá");
        } finally {
            setLoading(false);
        }
    }

    return {
        cities,
        loading,
        searchCity
    }
}

export default useSearchCity;
