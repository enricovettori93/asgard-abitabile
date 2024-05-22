"use client"

import useGetLocationDetail from "@/app/account/locations/[id]/_components/detail/hooks/useGetLocationDetail";
import {useContext, useEffect} from "react";
import {useParams} from "next/navigation";
import {Location, Picture, Reservation} from "@prisma/client";
import useRemoveImage from "@/app/account/locations/[id]/_components/detail/hooks/useRemoveImage";
import LocationEditForm from "@/app/account/locations/[id]/_components/detail/location-edit-form";
import useEditLocation from "@/app/account/locations/[id]/_components/detail/hooks/useEditLocation";
import {EditLocationForm} from "@/types/location";
import dynamic from "next/dynamic";
import LocationDetailGallery from "@/app/account/locations/[id]/_components/detail/gallery";
import {UiContext} from "@/context/ui.context";
import useGetReservationDetail from "@/app/account/locations/[id]/_components/detail/hooks/useGetReservationDetail";
import useConfirmReservation from "@/app/account/locations/[id]/_components/detail/hooks/useConfirmReservation";
import DetailReservationModal from "@/app/account/locations/[id]/_components/detail/modals/delete-reservation";
import DeleteImageModal from "@/app/account/locations/[id]/_components/detail/modals/delete-image";
const ReservationCalendar = dynamic(() => import("@/app/account/locations/[id]/_components/detail/reservations-calendar"), {ssr: false});

const MyAccountLocationDetail = () => {
    const {id} = useParams<{id: Location["id"]}>();
    const {loading: getLocationLoading, location, getLocationDetail} = useGetLocationDetail();
    const {loading: editLocationLoading, editLocation} = useEditLocation();
    const {loading: confirmLoading, confirmReservation} = useConfirmReservation();
    const {getReservationDetail, reservation} = useGetReservationDetail();
    const {loading: removeImageLoading, removeImage} = useRemoveImage();
    const {setModal, removeModal} = useContext(UiContext);

    useEffect(() => {
        getLocationDetail(id);
    }, []);

    useEffect(() => {
        if (reservation) {
            setModal(
                <DetailReservationModal
                    reservation={reservation}
                    closeModal={removeModal}
                    onConfirmDeleteReservation={() => handleConfirmReservation(reservation.id)}
                    loading={confirmLoading}
                />
            );
        }
    }, [reservation]);

    const handleConfirmReservation = async (reservation: Reservation["id"]) => {
        await confirmReservation(reservation);
        removeModal();
    }

    const handleConfirmDeleteImage = async (pictureId: Picture["id"]) => {
        await removeImage(location!.id, pictureId);
        await getLocationDetail(id);
        removeModal();
    }

    const handleUpdateLocation = async (payload: EditLocationForm) => {
        await editLocation(location!.id, payload);
        await getLocationDetail(id);
    }

    const handleReservationClick = async (reservationId: Reservation["id"]) => {
        await getReservationDetail(location!.id, reservationId!);
    }

    const handleDeleteImage = async (pictureId: Picture["id"]) => {
        removeModal();
        setModal(
            <DeleteImageModal
                loading={removeImageLoading}
                closeModal={removeModal}
                onConfirmDeleteImage={() => handleConfirmDeleteImage(pictureId)}
            />
        );
    }

    if (getLocationLoading) {
        return (<p>Loading location..</p>);
    }

    if (!location) {
        return (<p>Location not found</p>);
    }

    return (
        <>
            <h2 className="text-3xl mb-5">Modifica la tua location</h2>
            <div className="grid grid-cols-2 gap-5">
                <LocationDetailGallery pictures={location?.pictures} onRemoveImage={handleDeleteImage} />
                <ReservationCalendar location={location} onClickReservation={handleReservationClick}/>
            </div>
            <LocationEditForm location={location} onEditLocation={handleUpdateLocation} loading={editLocationLoading} />
        </>
    )
}

export default MyAccountLocationDetail;
