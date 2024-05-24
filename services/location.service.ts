import {Location, Picture} from "@prisma/client";
import {
    AddLocationForm,
    EditLocationForm,
    LocationWithPicturesAndUser
} from "@/types/location";
import betterFetch from "@/utils/fetch";

interface LocationServiceInterface {
    getDetail(locationId: Location["id"], {startDate, endDate}: {startDate: Date, endDate: Date}): Promise<LocationWithPicturesAndUser>
    add(payload: AddLocationForm): Promise<Location>
    update(locationId: Location["id"], payload: EditLocationForm): Promise<Location>
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

    async update(locationId: Location["id"], payload: EditLocationForm): Promise<Location> {
        return (await betterFetch<Location>(`locations/${locationId}`, {
            method: "PATCH",
            body: JSON.stringify(payload)
        })).data as Location;
    }
}

export default new LocationService();
