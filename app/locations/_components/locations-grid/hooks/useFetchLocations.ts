import {useRouter, useSearchParams} from "next/navigation";

const useFetchLocations = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageChange = (page: number) => {
        const queryParams = new URLSearchParams(searchParams.toString());
        queryParams.set("page", `${page}`);
        router.push(`?${queryParams.toString()}`);
    }

    const handlePageChange = (page: number) => {
        pageChange(page);
    }

    return {
        handlePageChange
    }
}

export default useFetchLocations;
