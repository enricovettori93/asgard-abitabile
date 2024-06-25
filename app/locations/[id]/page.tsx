import betterFetch from "@/utils/fetch";
import {LocationDetail} from "@/app/locations/[id]/_components/location-detail";
import {LocationWithPicturesAndUserAndTags} from "@/types/location";

async function getLocation(id: string): Promise<LocationWithPicturesAndUserAndTags> {
    const res = await betterFetch<LocationWithPicturesAndUserAndTags>(`locations/${id}`);

    return res.data as LocationWithPicturesAndUserAndTags;
}

export default async function Page({ params }: { params: { id: string }}) {
    const location = await getLocation(params.id);

    return (
        <LocationDetail location={location}/>
    )
}
