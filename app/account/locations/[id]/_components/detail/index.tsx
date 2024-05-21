"use client"

import useGetLocationDetail from "@/app/account/locations/[id]/_components/detail/hooks/useGetLocationDetail";
import {useEffect} from "react";
import {useParams} from "next/navigation";
import {Location, Picture} from "@prisma/client";
import ImageDetail from "@/app/account/locations/[id]/_components/detail/image-detail";
import useRemoveImage from "@/app/account/locations/[id]/_components/detail/hooks/useRemoveImage";
import LocationEditForm from "@/app/account/locations/[id]/_components/detail/location-edit-form";
import useEditLocation from "@/app/account/locations/[id]/_components/detail/hooks/useEditLocation";
import {EditLocationForm} from "@/types/location";
import {Swiper, SwiperSlide} from "swiper/react";
import dynamic from "next/dynamic";
import LocationDetailGallery from "@/app/account/locations/[id]/_components/detail/gallery";
const ReservationCalendar = dynamic(() => import("@/app/account/locations/[id]/_components/detail/reservations-calendar"), {ssr: false});

const MyAccountLocationDetail = () => {
    const {id} = useParams<{id: Location["id"]}>();
    const {loading: getLocationLoading, location, getLocationDetail} = useGetLocationDetail();
    const {loading: editLocationLoading, editLocation} = useEditLocation();
    const {removeImage} = useRemoveImage();

    useEffect(() => {
        getLocationDetail(id);
    }, []);

    const handleRemoveImage = async (pictureId: Picture["id"]) => {
        await removeImage(location!.id, pictureId);
        await getLocationDetail(id);
    }

    const handleUpdateLocation = async (payload: EditLocationForm) => {
        await editLocation(location!.id, payload);
        await getLocationDetail(id);
    }

    if (getLocationLoading) {
        return (<p>Loading location..</p>);
    }

    if (!location) {
        return (<p>Location not found</p>);
    }

    return (
        <>
            <LocationDetailGallery pictures={location?.pictures} onRemoveImage={handleRemoveImage} />
            <LocationEditForm location={location} onEditLocation={handleUpdateLocation} loading={editLocationLoading} />
            <ReservationCalendar location={location} onClickReservation={(id) => console.log(id)}/>
        </>
    )
}

export default MyAccountLocationDetail;
