"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {LocationSearchForm} from "@/types/location";
import {useRouter} from "next/navigation";

export default function LocationSearchForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit
    } = useForm<LocationSearchForm>();

    const onSubmit: SubmitHandler<LocationSearchForm> = async (payload) => {
        const queryParams = new URLSearchParams(payload);
        router.push(`/locations?${queryParams}`);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col">
                <label htmlFor="city">Cittá</label>
                <input id="city" type="text" {...register("title", {required: true})}/>
            </div>
            <div className="flex">
                <div className="flex flex-col">
                    <label htmlFor="city">Da</label>
                    <input id="city" type="date" {...register("from", {required: true})}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="city">A</label>
                    <input id="city" type="date" {...register("to", {required: true})}/>
                </div>
            </div>
            <button className="button--primary" type="submit">Cerca</button>
        </form>
    )
}
