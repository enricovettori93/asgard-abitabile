"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {LocationSearchForm} from "@/types/location";
import {useRouter, useSearchParams} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {SearchLocationSchema} from "@/utils/validators";
import FieldWrapper from "@/components/inputs/field-wrapper";
import {ADULTS_PER_NIGHT} from "@/utils/constants";

interface props {
    onSearch?: () => void
}

export default function LocationSearchForm({onSearch}: props) {
    const router = useRouter();
    const params = useSearchParams();

    const initialValues: LocationSearchForm = {
        city: params.get("city") || "",
        from: params.get("from") || "",
        to: params.get("to") || "",
        maxAdultsForNight: Number(params.get("maxAdultsForNight")) || 0,
        priceForNight: Number(params.get("priceForNight")) || 0
    };

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LocationSearchForm>({
        resolver: zodResolver(SearchLocationSchema),
        defaultValues: initialValues
    });

    const onSubmit: SubmitHandler<LocationSearchForm> = async (payload) => {
        const queryParams = new URLSearchParams({...payload, page: "1"} as unknown as Record<string, string>);
        onSearch && onSearch();
        router.push(`/locations?${queryParams}`);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full z-10 gap-2">
            <div className="flex flex-col">
                <FieldWrapper error={errors.city}>
                    <label htmlFor="city">Cittá</label>
                    <input id="city" type="text" {...register("city")}/>
                </FieldWrapper>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <FieldWrapper error={errors.maxAdultsForNight}>
                    <label htmlFor="maxAdultsForNight">Adulti per notte</label>
                    <input id="maxAdultsForNight" min={ADULTS_PER_NIGHT.MIN} max={ADULTS_PER_NIGHT.MAX}
                           type="number" {...register("maxAdultsForNight", {valueAsNumber: true})}/>
                </FieldWrapper>
                <FieldWrapper error={errors.priceForNight}>
                    <label htmlFor="priceForNight">Prezzo per notte</label>
                    <input id="priceForNight" min={0}
                           type="number" step=".01" {...register("priceForNight", {valueAsNumber: true})}/>
                </FieldWrapper>
                <FieldWrapper error={errors.from}>
                    <label htmlFor="from">Da</label>
                    <input id="from" type="date" {...register("from")}/>
                </FieldWrapper>
                <FieldWrapper error={errors.to}>
                    <label htmlFor="to">A</label>
                    <input id="to" type="date" {...register("to")}/>
                </FieldWrapper>
            </div>
            <button className="button--primary mt-5 ml-auto px-10" type="submit">Cerca</button>
        </form>
    )
}
