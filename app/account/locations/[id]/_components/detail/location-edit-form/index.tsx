"use client"

import LocationForm from "@/components/forms/location-form";
import {EditLocationForm, LocationWithPicturesAndReservations} from "@/types/location";

interface props {
    location: LocationWithPicturesAndReservations
    loading: boolean
    onEditLocation: (payload: EditLocationForm) => Promise<void>
}

const LocationEditForm = ({location, loading, onEditLocation}: props) => {
    const defaultValues = {
        title: location.title,
        description: location.description,
        lat: location.lat,
        lng: location.lng,
        maxAdultsForNight: location.maxAdultsForNight,
        priceForNight: location.priceForNight,
        published: location.published
    };

    const handleSubmit = async (payload: EditLocationForm) => {
        await onEditLocation(payload);
    }

    return (
        <>
            <LocationForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                <button disabled={loading} className="button--primary mx-auto mt-5" type="submit">Modifica</button>
            </LocationForm>
        </>
    )
}

export default LocationEditForm;
