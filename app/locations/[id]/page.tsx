import {Location} from "@prisma/client";
import {LocationDetail} from "@/components/location-detail";

async function getLocation(id: string): Promise<Location> {
    const res = await fetch(`http://localhost:3000/api/locations/${id}`);

    return (await res.json()).data;
}

export default async function Page({ params }: { params: { id: string }}) {
    const location = await getLocation(params.id);

    return (
        <LocationDetail location={location}/>
    )
}
