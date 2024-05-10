import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import betterFetch from "@/utils/fetch";
import {LocationWithPictures} from "@/types/location";

interface props {
    data: LocationWithPictures[]
    currentPage: number
}

const useFetchLocations = ({data, currentPage}: props) => {
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState(data);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFetch = async () => {
        setLoading(true);
        const queryParams = new URLSearchParams(searchParams.toString());
        const currentPage = Number(queryParams.get("page")) ?? 1;
        // fixme: seems to reload the component and fetch multiple time
        queryParams.set("page", `${currentPage + 1}`);
        router.replace(`?${queryParams.toString()}`, {scroll: false});
        const {data = []} = await betterFetch<LocationWithPictures[]>(`locations?${queryParams}`);

        setLocations(prev => [...prev, ...data]);
        setLoading(false);
    }

    const handleLoadMore = async () => {
        await handleFetch();
    }

    return {
        locations,
        loading,
        handleLoadMore
    }
}

export default useFetchLocations;
