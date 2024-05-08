import {LocationWithPictures} from "@/types/location";
import betterFetch from "@/utils/fetch";
import {ResponseDTO} from "@/types/common";
import LocationsGrid from "@/components/locations-grid";

async function getLocations(searchParams: Record<string, string>): Promise<{
    data: LocationWithPictures[],
    count: string
}> {
    const queryParams = new URLSearchParams(searchParams as unknown as Record<string, string>);
    const {
        data,
        count
    } = await betterFetch<ResponseDTO<LocationWithPictures[]>>(`locations?${queryParams}`);

    return {
        data: data as LocationWithPictures[],
        count: count as string
    }
}

export default async function Page({searchParams}: { searchParams: Record<string, string> }) {
    const {data, count} = await getLocations(searchParams);

    return (
        <LocationsGrid data={data} totalElements={+count} currentPage={+searchParams["page"] || 1}/>
    )
}
