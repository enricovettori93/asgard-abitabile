import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LocationSchema} from "@/utils/validators";
import LocationForm from "@/components/forms/location-form";
import {EditLocationForm, LocationWithPicturesAndUser} from "@/types/location";

interface props {
    location: LocationWithPicturesAndUser
    loading: boolean
    onEditLocation: (payload: EditLocationForm) => Promise<void>
}

const LocationEditForm = ({location, loading, onEditLocation}: props) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<EditLocationForm>({
        resolver: zodResolver(LocationSchema),
        defaultValues: {
            title: location.title,
            description: location.description,
            lat: location.lat,
            lng: location.lng,
            maxAdultsForNight: location.maxAdultsForNight,
            priceForNight: location.priceForNight,
            published: location.published
        }
    });

    const onSubmit: SubmitHandler<EditLocationForm> = async (payload) => {
        await onEditLocation(payload);
    }

    return (
        <>
            <LocationForm handleSubmit={handleSubmit(onSubmit)} register={register} errors={errors}>
                <button disabled={loading} className="button--primary mx-auto mt-5" type="submit">Modifica</button>
            </LocationForm>
        </>
    )
}

export default LocationEditForm;
