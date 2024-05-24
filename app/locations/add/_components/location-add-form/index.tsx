"use client"

import {AddLocationForm} from "@/types/location";
import useAddLocation from "@/app/locations/add/_components/location-add-form/hooks/useAddLocation";
import LocationForm from "@/components/forms/location-form";

export default function LocationAddForm() {
    const {addLocation, loading} = useAddLocation();

    const handleSubmit = async (payload: AddLocationForm) => {
        await addLocation(payload);
    }

    return (
        <>
            <LocationForm onSubmit={handleSubmit}>
                <button disabled={loading} className="button--primary mx-auto ml-auto" type="submit">Inserisci</button>
            </LocationForm>
        </>
    );
}
