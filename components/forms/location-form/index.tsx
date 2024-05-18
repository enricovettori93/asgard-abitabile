import React from 'react';
import FieldWrapper from "@/components/inputs/field-wrapper";
import {FieldErrors, UseFormRegister} from "react-hook-form";
import {AddLocation, AddLocationForm, EditLocationForm} from "@/types/location";

interface props {
    register: UseFormRegister<AddLocation | AddLocationForm | EditLocationForm>
    handleSubmit: any
    errors: FieldErrors<AddLocation>
    children: React.ReactNode
}

const LocationForm = ({register, handleSubmit, errors, children}: props) => {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
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
                <FieldWrapper error={errors.maxAdultsForNight}>
                    <label htmlFor="maxAdultsForNight">Numero massimo di adulti per notte</label>
                    <input id="maxAdultsForNight"
                           type="number" {...register("maxAdultsForNight", {valueAsNumber: true})}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.priceForNight}>
                    <label htmlFor="priceForNight">Prezzo per notte</label>
                    <input id="priceForNight" step=".01"
                           type="number" {...register("priceForNight", {valueAsNumber: true})}/>
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
            {children}
        </form>
    );
};

export default LocationForm;
