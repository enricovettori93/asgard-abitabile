"use client"

import {useForm, SubmitHandler} from "react-hook-form";
import {AddLocationForm} from "@/types/location";
import {zodResolver} from "@hookform/resolvers/zod";
import {LocationSchema} from "@/utils/validators";
import useAddLocation from "@/app/locations/add/_components/location-add-form/hooks/useAddLocation";
import LocationForm from "@/components/forms/location-form";

export default function LocationAddForm() {
    const {
        register,
        handleSubmit,
        formState: {errors, touchedFields}
    } = useForm<AddLocationForm>({
        resolver: zodResolver(LocationSchema)
    });

    const {addLocation, loading} = useAddLocation();

    const onSubmit: SubmitHandler<AddLocationForm> = async (payload) => {
        await addLocation(payload);
    };

    return (
        <>
            <LocationForm handleSubmit={handleSubmit(onSubmit)} register={register} errors={errors} touchedFields={touchedFields}>
                <button disabled={loading} className="button--primary mx-auto mt-5" type="submit">Inserisci</button>
            </LocationForm>
        </>
    );
}
