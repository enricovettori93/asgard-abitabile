"use client"

import {useForm, SubmitHandler} from "react-hook-form";
import {AddLocationForm} from "@/types/location";

export default function LocationAddForm() {
    const {
        register,
        handleSubmit,
    } = useForm<AddLocationForm>();

    const onSubmit: SubmitHandler<AddLocationForm> = async (payload) => {
        await fetch("http://localhost:3000/api/locations", {
            method: "POST",
            // todo: rimuovi hardcoded
            body: JSON.stringify({...payload, userId: "67caec95-0da3-4aa0-953d-e03332c795d5"})
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex gap-5">
                <label htmlFor="title">Titolo</label>
                <input id="title" type="text" {...register("title", {required: true})}/>
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
            <button type="submit">Inserisci</button>
        </form>
    );
}
