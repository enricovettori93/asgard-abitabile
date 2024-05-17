import {Location, Picture} from "@prisma/client";
import {AddLocationForm, LocationWithPicturesAndUser} from "@/types/location";
import betterFetch from "@/utils/fetch";

interface LocationServiceInterface {
    getDetail(locationId: Location["id"]): Promise<LocationWithPicturesAndUser>
    add(payload: AddLocationForm): Promise<Location>
    addPictures(locationId: Location["id"], payload: File[]): Promise<Location>
    removePicture(locationId: Location["id"], pictureId: Picture["id"]): Promise<void>
}

class LocationService implements LocationServiceInterface {
    async add(payload: AddLocationForm): Promise<Location> {
        return (await betterFetch<Location>("locations", {
            method: "POST",
            body: JSON.stringify(payload)
        })).data as Location;
    }

    async addPictures(locationId: Location["id"], payload: File[]): Promise<Location> {
        const formData = new FormData();
        for(let file of payload) {
            formData.append(file.name, file);
        }
        return (await betterFetch<Location>(`locations/${locationId}/pictures`, {
            method: "PUT",
            body: formData
        })).data as Location;
    }

    async getDetail(locationId: Location["id"]): Promise<LocationWithPicturesAndUser> {
        return (await betterFetch<LocationWithPicturesAndUser>(`users/me/locations/${locationId}`)).data as LocationWithPicturesAndUser;
    }

    async removePicture(locationId: Location["id"], pictureId: Picture["id"]): Promise<void> {
        await betterFetch(`locations/${locationId}/pictures/${pictureId}`, {
            method: "DELETE"
        });
    }
}

export default new LocationService();
