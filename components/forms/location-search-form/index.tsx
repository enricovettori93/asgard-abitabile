"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {LocationSearchForm} from "@/types/location";
import {useRouter, useSearchParams} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {SearchLocationSchema} from "@/utils/validators";
import FieldWrapper from "@/components/inputs/field-wrapper";
import {ADULTS_PER_NIGHT} from "@/utils/constants";
import Input from "@/components/inputs/input";
import SearchCityAutocomplete, {AutocompleteCityOption} from "@/components/inputs/search-city-autocomplete";

interface props {
    onSearch?: () => void
}

export default function LocationSearchForm({onSearch}: props) {
    const router = useRouter();
    const params = useSearchParams();

    const initialValues: LocationSearchForm = {
        cityName: params.get("cityName") || "",
        lat: Number(params.get("lat")) || 0,
        lng: Number(params.get("lng")) || 0,
        startDate: params.get("startDate") || "",
        endDate: params.get("endDate") || "",
        maxAdultsForNight: Number(params.get("maxAdultsForNight")) || undefined,
        priceForNight: Number(params.get("priceForNight")) || undefined
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors, touchedFields}
    } = useForm<LocationSearchForm>({
        resolver: zodResolver(SearchLocationSchema),
        defaultValues: initialValues
    });

    const onSubmit: SubmitHandler<LocationSearchForm> = async (payload) => {
        const queryParams = new URLSearchParams({...payload, page: "1"} as unknown as Record<string, string>);
        onSearch && onSearch();
        router.push(`/locations?${queryParams}`);
    }

    const handleSelectCity = (selection: AutocompleteCityOption) => {
        const {lat, value, lng} = selection;
        setValue("lat", lat);
        setValue("lng", lng);
        setValue("cityName", value);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full z-10">
            <div className="flex flex-col">
                <FieldWrapper error={errors.cityName}>
                    <SearchCityAutocomplete onCitySelect={handleSelectCity} {...(!!initialValues.cityName && {
                        initialValue: {
                            value: initialValues.cityName || "",
                            label: initialValues.cityName || "",
                            lat: Number(initialValues.lat),
                            lng: Number(initialValues.lng)
                        }
                    })} />
                </FieldWrapper>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
                <FieldWrapper error={errors.maxAdultsForNight}>
                    <Input id="maxAdultsForNight"
                           name="maxAdultsForNight"
                           label="Adulti per notte"
                           type="number"
                           min={ADULTS_PER_NIGHT.MIN}
                           max={ADULTS_PER_NIGHT.MAX}
                           touched={touchedFields["maxAdultsForNight"]}
                           register={{...register("maxAdultsForNight", {valueAsNumber: true})}}
                    />
                </FieldWrapper>
                <FieldWrapper error={errors.priceForNight}>
                    <Input id="priceForNight"
                           name="priceForNight"
                           label="Prezzo per notte"
                           type="number"
                           min={0}
                           step=".01"
                           touched={touchedFields["priceForNight"]}
                           register={{...register("priceForNight", {valueAsNumber: true})}}
                    />
                </FieldWrapper>
                <FieldWrapper error={errors.startDate}>
                    <Input id="startDate" name="startDate" label="Da" type="date" register={{...register("startDate")}}
                           touched={touchedFields["startDate"]}/>
                </FieldWrapper>
                <FieldWrapper error={errors.endDate}>
                    <Input id="endDate" name="endDate" label="A" type="date" register={{...register("endDate")}}
                           touched={touchedFields["endDate"]}/>
                </FieldWrapper>
            </div>
            <button className="button--primary mt-5 ml-auto px-10" type="submit">Cerca</button>
        </form>
    )
}
