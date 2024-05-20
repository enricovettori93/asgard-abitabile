import React from 'react';
import FieldWrapper from "@/components/inputs/field-wrapper";
import {DeepMap, DeepPartial, FieldErrors, UseFormRegister} from "react-hook-form";
import {AddLocation, AddLocationForm, EditLocationForm} from "@/types/location";
import Input from "@/components/inputs/input";
import TextArea from "@/components/inputs/textarea";

interface props {
    register: UseFormRegister<AddLocation | AddLocationForm | EditLocationForm>
    handleSubmit: any
    errors: FieldErrors<AddLocation>
    children: React.ReactNode
    touchedFields: DeepMap<DeepPartial<AddLocationForm>, boolean>
}

const LocationForm = ({register, handleSubmit, errors, children, touchedFields}: props) => {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex gap-5">
                <FieldWrapper error={errors.title}>
                    <Input id="title" name="title" label="Titolo" type="text" register={{...register("title")}} touched={touchedFields["title"]}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.description}>
                    <TextArea id="description" name="description" label="Descrizione" type="text" register={{...register("description")}} touched={touchedFields["description"]} />
                </FieldWrapper>
            </div>
            <div className="flex">
                <div className="flex gap-5">
                    <FieldWrapper error={errors.lat}>
                        <Input id="lat" name="lat" label="Latitudine" type="number" register={{...register("lat", {valueAsNumber: true})}} touched={touchedFields["lat"]}/>
                    </FieldWrapper>
                </div>
                <div className="flex gap-5">
                    <FieldWrapper error={errors.lng}>
                        <Input id="lng" name="lng" label="Longitudine" type="number" register={{...register("lng", {valueAsNumber: true})}} touched={touchedFields["lng"]}/>
                    </FieldWrapper>
                </div>
            </div>
            <div className="flex">
                <div className="flex gap-5">
                    <FieldWrapper error={errors.maxAdultsForNight}>
                        <Input id="maxAdultsForNight"
                           name="maxAdultsForNight"
                           label="Adulti per notte"
                           type="number"
                           register={{...register("maxAdultsForNight", {valueAsNumber: true})}}
                           touched={touchedFields["maxAdultsForNight"]}
                        />
                    </FieldWrapper>
                </div>
                <div className="flex gap-5">
                    <FieldWrapper error={errors.priceForNight}>
                        <Input id="priceForNight"
                           name="priceForNight"
                           label="Prezzo per notte"
                           type="number"
                           register={{...register("priceForNight", {valueAsNumber: true})}}
                           touched={touchedFields["priceForNight"]}
                        />
                    </FieldWrapper>
                </div>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.published}>
                    <Input id="published" name="published" label="Online" type="checkbox" register={{...register("published")}} touched={touchedFields["published"]}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <Input id="pictures" name="pictures" label="Fotografie" type="file" accept="image/*" multiple register={{...register("pictures")}} touched={false}/>
            </div>
            {children}
        </form>
    );
};

export default LocationForm;
