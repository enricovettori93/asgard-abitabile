"use client";

import {SubmitHandler, useForm} from "react-hook-form";
import {LocationReserveForm} from "@/types/location";
import {zodResolver} from "@hookform/resolvers/zod";
import {LocationReserveSchema} from "@/utils/validators";
import useCreateReservation from "@/app/locations/[id]/_components/location-reserve-form/hooks/useCreateReservation";
import {Location} from "@prisma/client";
import FieldWrapper from "@/components/inputs/field-wrapper";
import Input from "@/components/inputs/input";
import {useSearchParams} from "next/navigation";
import {mapDateToStringForInputs} from "@/utils/functions";
import classNames from "classnames";

interface props {
    location: Location
    disabled: boolean
    className?: string
}

const LocationReserveForm = ({location, className = "", disabled}: props) => {
    const params = useSearchParams();

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, touchedFields}
    } = useForm<LocationReserveForm>({
        resolver: zodResolver(LocationReserveSchema),
        // fixme: hacky way to break the zod rules for adding values as string to prepopulate the form
        defaultValues: {
            ...(!!params.get("startDate") && {startDate: (mapDateToStringForInputs(new Date(params.get("startDate") as string)) as unknown as Date)}),
            ...(!!params.get("endDate") && {endDate: (mapDateToStringForInputs(new Date(params.get("endDate") as string)) as unknown as Date)}),
        }
    });

    const startDate = watch().startDate;
    const endDate = watch().endDate;
    const persons = watch().adultsForNight;

    const {loading, createReservation} = useCreateReservation();

    const onSubmit: SubmitHandler<LocationReserveForm> = async (payload) => {
        await createReservation(location.id, payload);
    }

    const formClasses = classNames({
        "flex flex-col": true,
        [className]: true
    });

    const numberOfNight = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);

    const calculateTotal = () => {
        return ((numberOfNight * location.priceForNight) * persons).toFixed(2);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={formClasses}>
            <FieldWrapper error={errors.startDate}>
                <Input id="startDate" name="startDate" label="Da" type="date" register={{...register("startDate", {valueAsDate: true})}} touched={touchedFields["startDate"]}/>
            </FieldWrapper>
            <FieldWrapper error={errors.endDate}>
                <Input id="endDate" name="endDate" label="A" type="date" register={{...register("endDate",{valueAsDate: true})}} touched={touchedFields["endDate"]}/>
            </FieldWrapper>
            <FieldWrapper error={errors.adultsForNight}>
                <Input
                    id="adultsForNight"
                    name="adultsForNight"
                    label="Adulti"
                    type="number"
                    min={1}
                    max={location.maxAdultsForNight}
                    register={{...register("adultsForNight", {valueAsNumber: true})}}
                    touched={touchedFields["adultsForNight"]}
                />
            </FieldWrapper>
            <div className="flex flex-col gap-2">
                <span>Costo a persona a notte: {location.priceForNight.toFixed(2)}€</span>
            </div>
            {
                numberOfNight > 0 && (
                    <div>
                        <span>Numero notti: {numberOfNight}</span>
                    </div>
                )
            }
            {
                (!!startDate && !!endDate && persons > 0) && (
                    <div className="font-semibold mt-3">
                        <span>Totale: {calculateTotal()}€</span>
                    </div>
                )
            }
            <button type="submit" className="button--primary mt-5" disabled={loading || disabled}>Reserve</button>
        </form>
    );
};

export default LocationReserveForm;
