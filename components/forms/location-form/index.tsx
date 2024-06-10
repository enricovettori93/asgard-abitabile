"use client"

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import {useState, useRef} from 'react';
import FieldWrapper from "@/components/inputs/field-wrapper";
import {DeepPartial, FieldError, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/components/inputs/input";
import {ACCEPTED_IMAGE_TYPES} from "@/utils/constants";
import classNames from "classnames";
import {zodResolver} from "@hookform/resolvers/zod";
import {LocationSchema} from "@/utils/validators";
import LocationFormImagesPreview from "@/components/forms/location-form/images-preview";
import {AddLocationForm, EditLocationForm} from "@/types/location";
import Editor from "@/components/editor";
import Quill from "quill";
import {ValidationErrors} from "@/types/common";
import SearchCityAutocomplete, {AutocompleteCityOption} from "@/components/inputs/search-city-autocomplete";
const Delta = Quill.import('delta');

interface props {
    onSubmit: (payload: AddLocationForm | EditLocationForm) => Promise<void>
    children: React.ReactNode
    errors: ValidationErrors
    className?: string
    defaultValues?: DeepPartial<EditLocationForm>
}

const LocationForm = ({children, className = "", defaultValues = {}, onSubmit, errors: propsErrors}: props) => {
    const [images, setImages] = useState<File[]>([]);
    const quillRef = useRef<Quill>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors, touchedFields}
    } = useForm<AddLocationForm | EditLocationForm>({
        resolver: zodResolver(LocationSchema),
        errors: propsErrors,
        ...(defaultValues && {defaultValues})
    });

    const formClasses = classNames({
        [className]: true,
        "flex flex-col w-full": true,
    });

    const handleRemoveImage = (idx: number) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
    }

    const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && setImages(Array.from(e.target.files));
    }

    const submit: SubmitHandler<AddLocationForm | EditLocationForm> = async ({pictures, ...payload}) => {
        await onSubmit({...payload, pictures: images, description: JSON.stringify(quillRef.current?.editor.delta)});
    }

    const handleSelectCity = (selection: AutocompleteCityOption) => {
        const {lat, value, lng} = selection;
        setValue("lat", lat);
        setValue("lng", lng);
        setValue("cityName", value);
    }

    return (
        <form onSubmit={handleSubmit(submit)} className={formClasses}>
            <div className="flex gap-5">
                <FieldWrapper error={errors.title} className="w-1/2 md:w-1/4">
                    <Input id="title" name="title" label="Titolo" type="text" register={{...register("title")}}
                           touched={touchedFields["title"]}/>
                </FieldWrapper>
                <FieldWrapper error={errors.published} className="flex items-center">
                    <Input id="published" name="published" label="Online" type="checkbox"
                           register={{...register("published")}} touched={touchedFields["published"]}/>
                </FieldWrapper>
            </div>
            <div className="h-18 w-full md:w-1/2">
                <FieldWrapper error={errors.cityName}>
                    <SearchCityAutocomplete onCitySelect={handleSelectCity} {...(defaultValues && {
                        initialValue: {
                            value: defaultValues.cityName || "",
                            label: defaultValues.cityName || "",
                            lat: Number(defaultValues.lat),
                            lng: Number(defaultValues.lng)
                        }
                    })} />
                </FieldWrapper>
            </div>
            <div className="flex gap-1 md:gap-5 flex-wrap">
                <FieldWrapper className="flex-1" error={errors.lat}>
                    <Input id="lat" name="lat" label="Latitudine" type="number" step="any"
                           register={{...register("lat", {valueAsNumber: true})}} touched={touchedFields["lat"]}/>
                </FieldWrapper>
                <FieldWrapper className="flex-1" error={errors.lng}>
                    <Input id="lng" name="lng" label="Longitudine" type="number" step="any"
                           register={{...register("lng", {valueAsNumber: true})}} touched={touchedFields["lng"]}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-1 md:gap-5 flex-wrap">
                <FieldWrapper className="flex-1" error={errors.maxAdultsForNight}>
                    <Input id="maxAdultsForNight"
                           name="maxAdultsForNight"
                           label="Adulti per notte"
                           type="number"
                           register={{...register("maxAdultsForNight", {valueAsNumber: true})}}
                           touched={touchedFields["maxAdultsForNight"]}
                    />
                </FieldWrapper>
                <FieldWrapper className="flex-1" error={errors.priceForNight}>
                    <Input id="priceForNight"
                           name="priceForNight"
                           label="Prezzo per notte"
                           type="number"
                           register={{...register("priceForNight", {valueAsNumber: true})}}
                           touched={touchedFields["priceForNight"]}
                    />
                </FieldWrapper>
            </div>
            <div>
                <FieldWrapper className="w-full mt-5" error={errors.description as FieldError}>
                    <label className="!relative mb-2 !top-0">Descrizione</label>
                    <Editor ref={quillRef} defaultValue={new Delta(defaultValues.description || [])}/>
                </FieldWrapper>
            </div>
            <div className="flex gap-5">
                <FieldWrapper error={errors.pictures as FieldError}>
                    <Input id="pictures" name="pictures" label="Aggiungi le immagini" type="file"
                           accept={ACCEPTED_IMAGE_TYPES.join(",")} multiple
                           className="mt-2"
                           register={{...register("pictures", {onChange: handleChangeFiles})}} touched={false}/>
                </FieldWrapper>
            </div>
            {
                images.length > 0 && <LocationFormImagesPreview onRemovePicture={handleRemoveImage} files={images}/>
            }
            {children}
        </form>
    );
};

export default LocationForm;
