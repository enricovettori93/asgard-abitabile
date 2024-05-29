import betterFetch from "@/utils/fetch";
import {LocationDetail} from "@/app/locations/[id]/_components/location-detail";
import {LocationWithPicturesAndUser} from "@/types/location";

async function getLocation(id: string): Promise<LocationWithPicturesAndUser> {
    const res = await betterFetch<LocationWithPicturesAndUser>(`locations/${id}`);

    return res.data as LocationWithPicturesAndUser;
}

export default async function Page({ params }: { params: { id: string }}) {
    const location = await getLocation(params.id);

    return (
        <LocationDetail location={location}/>
    )
}
