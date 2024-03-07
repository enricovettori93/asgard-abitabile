import {Location} from "@prisma/client";
import CardLocation from "@/components/location-card";

async function getLocations(): Promise<Location[]> {
    const res = await fetch("http://localhost:3000/api/locations");

    return (await res.json()).data;
}

export default async function Page() {
    const data = await getLocations();

    return (
        <div>
            <h1>Tutte le locations</h1>
            <div className="grid grid-cols-3">
                {data.map(location => <CardLocation location={location}/>)}
            </div>
        </div>
    )
}
