"use client"

import {useForm, SubmitHandler} from "react-hook-form";
import {AddLocationForm} from "@/types/location";
import useAddLocation from "@/components/location-add-form/hooks/useAddLocation";

export default function LocationAddForm() {
    const {
        register,
        handleSubmit,
    } = useForm<AddLocationForm>();

    const { addLocation } = useAddLocation();

    const onSubmit: SubmitHandler<AddLocationForm> = async (payload) => {
        await addLocation(payload);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex gap-5">
                <label htmlFor="title">Titolo</label>
                <input id="title" type="text" {...register("title", {required: true})}/>
            </div>
            <div className="flex gap-5">
                <label htmlFor="title">Descrizione</label>
                <input id="title" type="textarea" {...register("description", {required: true})}/>
            </div>
            <div className="flex gap-5">
                <label htmlFor="lat">Latitudine</label>
                <input id="lat" type="number" {...register("lat", {valueAsNumber: true})}/>
            </div>
            <div className="flex gap-5">
                <label htmlFor="lng">Longitudine</label>
                <input id="lng" type="number" {...register("lng", {valueAsNumber: true})}/>
            </div>
            <div className="flex gap-5">
                <label htmlFor="published">Online</label>
                <input id="published" type="checkbox" {...register("published", {required: true})}/>
            </div>
            <div className="flex gap-5">
                <label htmlFor="pictures">Fotografie</label>
                <input id="pictures" type="file" accept="image/jpeg" multiple {...register("pictures")}/>
            </div>
            <button type="submit">Inserisci</button>
        </form>
    );
}
