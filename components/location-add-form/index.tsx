"use client"

import {useForm, SubmitHandler} from "react-hook-form";
import {AddLocationForm} from "@/types/location";
import useAddLocation from "@/components/location-add-form/hooks/useAddLocation";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {NewLocationSchema} from "@/utils/validators";
import FieldWrapper from "@/components/inputs/field-wrapper";

export default function LocationAddForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<AddLocationForm>({
        resolver: zodResolver(NewLocationSchema)
    });
    const router = useRouter();

    const {addLocation, loading} = useAddLocation();

    const onSubmit: SubmitHandler<AddLocationForm> = async (payload) => {
        const id = await addLocation(payload);
        router.push(`/locations/${id}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex gap-5">
                <FieldWrapper error={errors.title}>
                    <label htmlFor="title">Titolo</label>
                    <input id="title" type="text" {...register("title")}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.description}>
                    <label htmlFor="description">Descrizione</label>
                    <textarea id="description" {...register("description")}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.lat}>
                    <label htmlFor="lat">Latitudine</label>
                    <input id="lat" type="number" {...register("lat", {valueAsNumber: true})}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.lng}>
                    <label htmlFor="lng">Longitudine</label>
                    <input id="lng" type="number" {...register("lng", {valueAsNumber: true})}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.published}>
                    <label htmlFor="published">Online</label>
                    <input id="published" type="checkbox" {...register("published")}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <label htmlFor="pictures">Fotografie</label>
                <input id="pictures" type="file" accept="image/jpeg" multiple {...register("pictures")}/>
            </div>
            <button disabled={loading} className="button--primary mx-auto mt-5" type="submit">Inserisci</button>
        </form>
    );
}
