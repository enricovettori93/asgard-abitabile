import {Location} from "@prisma/client";
import {AddLocationForm} from "@/types/location";
import betterFetch from "@/utils/fetch";

interface LocationServiceInterface {
    add(payload: AddLocationForm): Promise<Location>
}

class LocationService implements LocationServiceInterface {
    add(payload: AddLocationForm): Promise<Location> {
        return betterFetch("http://localhost:3000/api/locations", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    }

    addPictures(locationId: Location["id"], payload: File[]): Promise<Location> {
        const formData = new FormData();
        for(let file of payload) {
            formData.append(file.name, file);
        }
        return betterFetch(`http://localhost:3000/api/locations/${locationId}/pictures`, {
            method: "PUT",
            body: formData
        });
    }
}

export default new LocationService();
