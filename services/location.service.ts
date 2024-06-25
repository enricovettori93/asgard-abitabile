import {Location, Picture} from "@prisma/client";
import {
    AddLocationForm,
    EditLocationForm,
    LocationWithPicturesAndUserAndTags, LocationWithPicturesAndUserAndTags
} from "@/types/location";
import betterFetch from "@/utils/fetch";

interface LocationServiceInterface {
    getDetail(locationId: Location["id"], {startDate, endDate}: {startDate: Date, endDate: Date}): Promise<LocationWithPicturesAndUserAndTags>
    add(payload: AddLocationForm): Promise<Location>
    update(locationId: Location["id"], payload: EditLocationForm): Promise<Location>
    addPictures(locationId: Location["id"], payload: File[]): Promise<Location>
    delete(locationId: Location["id"]): Promise<void>
    removePicture(locationId: Location["id"], pictureId: Picture["id"]): Promise<void>
}

class LocationService implements LocationServiceInterface {
    async add(payload: AddLocationForm): Promise<Location> {
        return (await betterFetch<Location>("users/me/locations", {
            method: "POST",
            body: JSON.stringify(payload)
        })).data as Location;
    }

    async addPictures(locationId: Location["id"], payload: File[]): Promise<Location> {
        const formData = new FormData();
        for(let file of payload) {
            formData.append(file.name, file);
        }
        return (await betterFetch<Location>(`users/me/locations/${locationId}/pictures`, {
            method: "PUT",
            body: formData
        })).data as Location;
    }

    async getDetail(locationId: Location["id"]): Promise<LocationWithPicturesAndUserAndTags> {
        return (await betterFetch<LocationWithPicturesAndUserAndTags>(`users/me/locations/${locationId}`)).data as LocationWithPicturesAndUserAndTags;
    }

    async removePicture(locationId: Location["id"], pictureId: Picture["id"]): Promise<void> {
        await betterFetch(`users/me/locations/${locationId}/pictures/${pictureId}`, {
            method: "DELETE"
        });
    }

    async update(locationId: Location["id"], payload: EditLocationForm): Promise<Location> {
        return (await betterFetch<Location>(`users/me/locations/${locationId}`, {
            method: "PATCH",
            body: JSON.stringify(payload)
        })).data as Location;
    }

    async delete(locationId: Location["id"]): Promise<void> {
        await betterFetch(`users/me/locations/${locationId}`, {
            method: "DELETE"
        });
    }
}

export default new LocationService();
