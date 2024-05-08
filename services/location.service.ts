import {Location} from "@prisma/client";
import {AddLocationForm} from "@/types/location";
import betterFetch from "@/utils/fetch";
import {ResponseDTO} from "@/types/common";

interface LocationServiceInterface {
    add(payload: AddLocationForm): Promise<Location>
    addPictures(locationId: Location["id"], payload: File[]): Promise<Location>
}

class LocationService implements LocationServiceInterface {
    async add(payload: AddLocationForm): Promise<Location> {
        return (await betterFetch<ResponseDTO<Location>>("http://localhost:3000/api/locations", {
            method: "POST",
            body: JSON.stringify(payload)
        })).data as Location;
    }

    async addPictures(locationId: Location["id"], payload: File[]): Promise<Location> {
        const formData = new FormData();
        for(let file of payload) {
            formData.append(file.name, file);
        }
        return (await betterFetch<ResponseDTO<Location>>(`http://localhost:3000/api/locations/${locationId}/pictures`, {
            method: "PUT",
            body: formData
        })).data as Location;
    }
}

export default new LocationService();
