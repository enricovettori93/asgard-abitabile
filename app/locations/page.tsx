import {LocationAvailableWithPictures} from "@/types/location";
import betterFetch from "@/utils/fetch";
import LocationsGrid from "@/app/locations/_components/locations-grid";
import LocationListFilters from "@/app/locations/_components/list-filters";

async function getLocations(searchParams: Record<string, string>): Promise<{
    data: LocationAvailableWithPictures[],
    count: string
}> {
    const queryParams = new URLSearchParams(searchParams as unknown as Record<string, string>);
    const {
        data,
        count
    } = await betterFetch<LocationAvailableWithPictures[]>(`locations?${queryParams}`);

    return {
        data: data as LocationAvailableWithPictures[],
        count: count as string
    }
}

export default async function Page({searchParams}: { searchParams: Record<string, string> }) {
    const {data, count} = await getLocations(searchParams);

    return (
        <>
            <LocationListFilters />
            <LocationsGrid data={data} totalElements={+count} currentPage={+searchParams["page"] || 1}/>
        </>
    )
}
