import React from 'react';
import FieldWrapper from "@/components/inputs/field-wrapper";
import {DeepMap, DeepPartial, FieldError, FieldErrors, UseFormRegister} from "react-hook-form";
import {AddLocationForm, EditLocationForm} from "@/types/location";
import Input from "@/components/inputs/input";
import TextArea from "@/components/inputs/textarea";
import {ACCEPTED_IMAGE_TYPES} from "@/utils/constants";
import classNames from "classnames";

interface props {
    register: UseFormRegister<AddLocationForm | EditLocationForm>
    handleSubmit: () => void
    errors: FieldErrors<AddLocationForm>
    children: React.ReactNode
    touchedFields: DeepMap<DeepPartial<AddLocationForm>, boolean>
    onChangeFiles: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
}

const LocationForm = ({register, handleSubmit, errors, children, touchedFields, className = "", onChangeFiles}: props) => {
    const formClasses = classNames({
        [className]: true,
        "flex flex-col w-full": true,
    });

    return (
        <form onSubmit={handleSubmit} className={formClasses}>
            <div className="flex gap-5">
                <FieldWrapper error={errors.title}>
                    <Input id="title" name="title" label="Titolo" type="text" register={{...register("title")}}
                           touched={touchedFields["title"]}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <div className="flex gap-5">
                    <FieldWrapper error={errors.lat}>
                        <Input id="lat" name="lat" label="Latitudine" type="number"
                               register={{...register("lat", {valueAsNumber: true})}} touched={touchedFields["lat"]}/>
                    </FieldWrapper>
                </div>
                <div className="flex gap-5">
                    <FieldWrapper error={errors.lng}>
                        <Input id="lng" name="lng" label="Longitudine" type="number"
                               register={{...register("lng", {valueAsNumber: true})}} touched={touchedFields["lng"]}/>
                    </FieldWrapper>
                </div>
            </div>
            <div className="flex gap-5">
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
                <FieldWrapper error={errors.published} className="flex items-center">
                    <Input id="published" name="published" label="Online" type="checkbox"
                           register={{...register("published")}} touched={touchedFields["published"]}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.description}>
                    <TextArea id="description" name="description" label="Descrizione" type="text"
                              register={{...register("description")}} touched={touchedFields["description"]}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.pictures as FieldError}>
                    <Input id="pictures" name="pictures" label="Fotografie" type="file" accept={ACCEPTED_IMAGE_TYPES.join(",")} multiple
                           className="mt-2"
                           register={{...register("pictures", {onChange: onChangeFiles})}} touched={false}/>
                </FieldWrapper>
            </div>
            {children}
        </form>
    );
};

export default LocationForm;
