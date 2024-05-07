import {LocationWithPictures} from "@/types/location";
import LocationsGrid from "@/components/locations-grid";

async function getLocations(searchParams: Record<string, string>): Promise<LocationWithPictures[]> {
    const queryParams = new URLSearchParams(searchParams as unknown as Record<string, string>);
    // todo: remove hardcoded var
    const res = await fetch(`http://localhost:3000/api/locations?${queryParams}`);

    return (await res.json()).data;
}

export default async function Page({ searchParams }: { searchParams: Record<string, string>} ) {
    const data = await getLocations(searchParams);

    return (
        <LocationsGrid data={data} currentPage={+searchParams["page"] || 1} />
    )
}
