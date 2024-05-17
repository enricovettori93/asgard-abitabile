import {Location} from "@prisma/client";
import betterFetch from "@/utils/fetch";
import {LocationDetail} from "@/app/locations/[id]/_components/location-detail";

async function getLocation(id: string): Promise<Location> {
    const res = await betterFetch<Location>(`locations/${id}`);

    return res.data as Location;
}

export default async function Page({ params }: { params: { id: string }}) {
    const location = await getLocation(params.id);

    return (
        <LocationDetail location={location}/>
    )
}
