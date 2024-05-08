import {Location} from "@prisma/client";
import {LocationDetail} from "@/components/location-detail";
import betterFetch from "@/utils/fetch";
import {ResponseDTO} from "@/types/common";

async function getLocation(id: string): Promise<Location> {
    const res = await betterFetch<ResponseDTO<Location>>(`locations/${id}`);

    return res.data as Location;
}

export default async function Page({ params }: { params: { id: string }}) {
    const location = await getLocation(params.id);

    return (
        <LocationDetail location={location}/>
    )
}
