import {useEffect, useState} from "react";
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
    const [page, setPage] = useState(currentPage);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFetch = async () => {
        setLoading(true);
        const queryParams = new URLSearchParams({page: `${page}`});
        const {data = []} = await betterFetch<LocationWithPictures[]>(`locations?${queryParams}`);

        setLocations(prev => [...prev, ...data]);

        // fixme: seems to reload the component and fetch multiple time
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set("page", `${page}`);
        router.replace(`?${currentParams.toString()}`, {scroll: false});
        setLoading(false);
    }

    const handleLoadMore = async () => {
        setPage(page => page + 1);
    }

    useEffect(() => {
        if (page > 1) {
            handleFetch();
        }
    }, [page]);

    return {
        locations,
        loading,
        handleLoadMore
    }
}

export default useFetchLocations;
