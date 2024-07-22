"use client"

import {AddLocationForm} from "@/types/location";
import useAddLocation from "@/app/account/locations/add/_components/location-add-form/hooks/useAddLocation";
import LocationForm from "@/components/forms/location-form";
import useAddPictures from "@/app/account/locations/add/_components/location-add-form/hooks/useAddPictures";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/utils/constants";

export default function LocationAddForm() {
    const router = useRouter();
    const {addLocation, isPending, errors} = useAddLocation();
    const {addPictures} = useAddPictures();

    const handleSubmit = async (payload: AddLocationForm) => {
        try {
            const { pictures, ...rest } = payload;
            const {id} = await addLocation(rest);
            await addPictures({id, payload: pictures});
            router.push(ROUTES.MY_LOCATIONS + `/${id}`);
        } catch (e) {
            // -_-
        }
    }

    return (
        <>
            <LocationForm onSubmit={handleSubmit} errors={errors}>
                <button disabled={isPending} className="button--primary mx-auto ml-auto" type="submit">Inserisci</button>
            </LocationForm>
        </>
    );
}
