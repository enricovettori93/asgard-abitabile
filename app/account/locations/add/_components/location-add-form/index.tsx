"use client"

import {AddLocationForm} from "@/types/location";
import useAddLocation from "@/app/account/locations/add/_components/location-add-form/hooks/useAddLocation";
import LocationForm from "@/components/forms/location-form";
import useAddPictures from "@/app/account/locations/add/_components/location-add-form/hooks/useAddPictures";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/utils/constants";
import useGetTags from "@/app/account/locations/[id]/_components/detail/hooks/useGetTags";
import {useState} from "react";
import {Tag} from "@prisma/client";
import TagPill from "@/components/tag-pill";
import useAddTags from "@/app/account/locations/add/_components/location-add-form/hooks/useAddTags";

export default function LocationAddForm() {
    const router = useRouter();
    const {addLocation, isPending, errors} = useAddLocation();
    const {addPictures} = useAddPictures();
    const {addTags} = useAddTags();
    const {tags} = useGetTags();
    const [selectedTags, setSelectedTags] = useState<Tag["id"][]>([]);

    const handleSubmit = async (payload: AddLocationForm) => {
        try {
            const { pictures, ...rest } = payload;
            const {id} = await addLocation(rest);
            await addPictures({id, payload: pictures});
            await addTags({id, payload: selectedTags});
            router.push(ROUTES.MY_LOCATIONS + `/${id}`);
        } catch (e) {
            // -_-
        }
    }

    const handleAddTag = (tagId: Tag["id"]) => {
        setSelectedTags([...selectedTags, tagId]);
    }

    const handleRemoveTag = (tagId: Tag["id"]) => {
        setSelectedTags(selectedTags.filter(t => t !== tagId));
    }

    return (
        <LocationForm onSubmit={handleSubmit} errors={errors}>
            {tags.length > 0 && (
                <section className="mb-5">
                    <p className="font-semibold mb-2">Seleziona i tag da agganciare alla location</p>
                    {tags.map(t => {
                        const isSelected = selectedTags.includes(t.id);

                        const props = {
                            tag: t,
                            ...isSelected ? {onRemove: handleRemoveTag} : {onAdd: handleAddTag}
                        }

                        return <TagPill key={t.id} className="inline-flex mr-2" {...props} />
                    })}
                </section>
            )}
            <button disabled={isPending} className="button--primary mx-auto ml-auto" type="submit">Inserisci</button>
        </LocationForm>
    );
}
