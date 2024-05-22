"use client"

import {useForm, SubmitHandler} from "react-hook-form";
import {AddLocationForm} from "@/types/location";
import {zodResolver} from "@hookform/resolvers/zod";
import {LocationSchema} from "@/utils/validators";
import useAddLocation from "@/app/locations/add/_components/location-add-form/hooks/useAddLocation";
import LocationForm from "@/components/forms/location-form";
import React, {useState} from "react";
import LocationFormImagesPreview from "@/components/forms/location-form/images-preview";

export default function LocationAddForm() {
    const [images, setImages] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        formState: {errors, touchedFields}
    } = useForm<AddLocationForm>({
        resolver: zodResolver(LocationSchema)
    });

    const {addLocation, loading} = useAddLocation();

    const onSubmit: SubmitHandler<AddLocationForm> = async ({pictures, ...payload}) => {
        await addLocation({...payload, pictures: images});
    };

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
                <button disabled={loading} className="button--primary mx-auto mt-5" type="submit">Inserisci</button>
            </LocationForm>
        </>
    );
}
