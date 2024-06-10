"use client"

import LocationForm from "@/components/forms/location-form";
import {EditLocationForm, LocationWithPictures} from "@/types/location";
import {ValidationErrors} from "@/types/common";

interface props {
    location: LocationWithPictures
    loading: boolean
    errors: ValidationErrors
    onEditLocation: (payload: EditLocationForm) => Promise<void>
}

const LocationEditForm = ({location, loading, onEditLocation, errors}: props) => {
    const defaultValues = {
        title: location.title,
        description: location.description,
        lat: location.lat,
        lng: location.lng,
        maxAdultsForNight: location.maxAdultsForNight,
        priceForNight: location.priceForNight,
        cityName: location.cityName,
        published: location.published
    };

    const handleSubmit = async (payload: EditLocationForm) => {
        await onEditLocation(payload);
    }

    return (
        <>
            <LocationForm onSubmit={handleSubmit} defaultValues={defaultValues} errors={errors}>
                <button disabled={loading} className="ml-auto button--primary mt-5" type="submit">Modifica</button>
            </LocationForm>
        </>
    )
}

export default LocationEditForm;
