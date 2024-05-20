"use client";

import {SubmitHandler, useForm} from "react-hook-form";
import {LocationReserveForm} from "@/types/location";
import {zodResolver} from "@hookform/resolvers/zod";
import {LocationReserveSchema} from "@/utils/validators";
import useCreateReservation from "@/app/locations/[id]/_components/location-reserve-form/hooks/useCreateReservation";
import {Location} from "@prisma/client";
import FieldWrapper from "@/components/inputs/field-wrapper";
import Input from "@/components/inputs/input";

interface props {
    location: Location
}

const LocationReserveForm = ({location}: props) => {
    const {
        register,
        handleSubmit,
        formState: {errors, touchedFields}
    } = useForm<LocationReserveForm>({
        resolver: zodResolver(LocationReserveSchema)
    });

    const {loading, createReservation} = useCreateReservation();

    const onSubmit: SubmitHandler<LocationReserveForm> = async (payload) => {
        await createReservation(location.id, payload);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
            <button type="submit" className="button--primary" disabled={loading}>Reserve</button>
        </form>
    );
};

export default LocationReserveForm;
