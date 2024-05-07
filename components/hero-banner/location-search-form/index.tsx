"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {LocationSearchForm} from "@/types/location";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {SearchLocationSchema} from "@/utils/validators";
import FieldWrapper from "@/components/inputs/field-wrapper";

export default function LocationSearchForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LocationSearchForm>({
        resolver: zodResolver(SearchLocationSchema)
    });

    const onSubmit: SubmitHandler<LocationSearchForm> = async (payload) => {
        const queryParams = new URLSearchParams({...payload, page: "1"} as unknown as Record<string, string>);
        router.push(`/locations?${queryParams}`);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col">
                <FieldWrapper error={errors.city}>
                    <label htmlFor="city">Cittá</label>
                    <input id="city" type="text" {...register("city")}/>
                </FieldWrapper>
            </div>
            <div className="flex">
                <div className="flex flex-col">
                    <FieldWrapper error={errors.from}>
                        <label htmlFor="from">Da</label>
                        <input id="from" type="date" {...register("from")}/>
                    </FieldWrapper>
                </div>
                <div className="flex flex-col">
                    <FieldWrapper error={errors.to}>
                        <label htmlFor="to">A</label>
                        <input id="to" type="date" {...register("to")}/>
                    </FieldWrapper>
                </div>
            </div>
            <button className="button--primary" type="submit">Cerca</button>
        </form>
    )
}
