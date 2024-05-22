"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LocationSchema} from "@/utils/validators";
import LocationForm from "@/components/forms/location-form";
import {EditLocationForm, LocationWithPicturesAndReservations} from "@/types/location";
import LocationFormImagesPreview from "@/components/forms/location-form/images-preview";
import React, {useState} from "react";

interface props {
    location: LocationWithPicturesAndReservations
    loading: boolean
    onEditLocation: (payload: EditLocationForm) => Promise<void>
}

const LocationEditForm = ({location, loading, onEditLocation}: props) => {
    const [images, setImages] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        formState: {errors, touchedFields}
    } = useForm<EditLocationForm>({
        resolver: zodResolver(LocationSchema),
        defaultValues: {
            title: location.title,
            description: location.description,
            lat: location.lat,
            lng: location.lng,
            maxAdultsForNight: location.maxAdultsForNight,
            priceForNight: location.priceForNight,
            published: location.published
        }
    });

    const onSubmit: SubmitHandler<EditLocationForm> = async ({pictures, ...payload}) => {
        await onEditLocation({...payload, pictures: images});
    }

    const handleRemoveImage = (idx: number) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
    }

    const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setImages(Array.from(e.target.files));
    }

    return (
        <>
            <LocationForm handleSubmit={handleSubmit(onSubmit)} register={register} errors={errors} touchedFields={touchedFields} onChangeFiles={handleChangeFiles}>
                {
                    images.length > 0 && <LocationFormImagesPreview onRemovePicture={handleRemoveImage} files={images} />
                }
                <button disabled={loading} className="button--primary mx-auto mt-5" type="submit">Modifica</button>
            </LocationForm>
        </>
    )
}

export default LocationEditForm;
