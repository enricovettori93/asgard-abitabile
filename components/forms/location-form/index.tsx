import React, {useState} from 'react';
import FieldWrapper from "@/components/inputs/field-wrapper";
import {DeepPartial, FieldError, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/components/inputs/input";
import TextArea from "@/components/inputs/textarea";
import {ACCEPTED_IMAGE_TYPES} from "@/utils/constants";
import classNames from "classnames";
import {zodResolver} from "@hookform/resolvers/zod";
import {LocationSchema} from "@/utils/validators";
import LocationFormImagesPreview from "@/components/forms/location-form/images-preview";
import {AddLocationForm, EditLocationForm} from "@/types/location";

interface props {
    onSubmit: (payload: AddLocationForm | EditLocationForm) => Promise<void>
    children: React.ReactNode
    className?: string
    defaultValues?: DeepPartial<EditLocationForm>
}

const LocationForm = ({children, className = "", defaultValues = {}, onSubmit}: props) => {
    const [images, setImages] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        formState: {errors, touchedFields}
    } = useForm<AddLocationForm | EditLocationForm>({
        resolver: zodResolver(LocationSchema),
        defaultValues: defaultValues,
    });

    const formClasses = classNames({
        [className]: true,
        "flex flex-col w-full": true,
    });

    const handleRemoveImage = (idx: number) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
    }

    const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setImages(Array.from(e.target.files));
    }

    const submit: SubmitHandler<AddLocationForm | EditLocationForm> = async ({pictures, ...payload}) => {
        await onSubmit({...payload, pictures: images});
    }

    return (
        <form onSubmit={handleSubmit(submit)} className={formClasses}>
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
                    <Input id="pictures" name="pictures" label="Aggiungi le immagini" type="file" accept={ACCEPTED_IMAGE_TYPES.join(",")} multiple
                           className="mt-2"
                           register={{...register("pictures", {onChange: handleChangeFiles})}} touched={false}/>
                </FieldWrapper>
            </div>
            <div>
                {
                    images.length > 0 && <LocationFormImagesPreview onRemovePicture={handleRemoveImage} files={images} />
                }
            </div>
            {children}
        </form>
    );
};

export default LocationForm;
