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
import Modal from "@/components/modal";
import {UiContext} from "@/context/ui.context";
import useGetReservationDetail from "@/app/account/locations/[id]/_components/detail/hooks/useGetReservationDetail";
import ReservationDetail from "@/app/account/locations/[id]/_components/detail/reservation-detail";
const ReservationCalendar = dynamic(() => import("@/app/account/locations/[id]/_components/detail/reservations-calendar"), {ssr: false});

const MyAccountLocationDetail = () => {
    const {id} = useParams<{id: Location["id"]}>();
    const {loading: getLocationLoading, location, getLocationDetail} = useGetLocationDetail();
    const {loading: editLocationLoading, editLocation} = useEditLocation();
    const {getReservationDetail, reservation} = useGetReservationDetail();
    const {removeImage} = useRemoveImage();
    const {setModal, removeModal} = useContext(UiContext);

    useEffect(() => {
        getLocationDetail(id);
    }, []);

    useEffect(() => {
        if (reservation) {
            setModal(ModalComponent);
        }
    }, [reservation]);

    const handleRemoveImage = async (pictureId: Picture["id"]) => {
        await removeImage(location!.id, pictureId);
        await getLocationDetail(id);
    }

    const handleUpdateLocation = async (payload: EditLocationForm) => {
        await editLocation(location!.id, payload);
        await getLocationDetail(id);
    }

    const handleReservationClick = async (reservationId: Reservation["id"]) => {
        await getReservationDetail(location!.id, reservationId!);
    }

    if (getLocationLoading) {
        return (<p>Loading location..</p>);
    }

    if (!location) {
        return (<p>Location not found</p>);
    }

    const ModalComponent = (
        <Modal.Container closeModal={removeModal}>
            <Modal.Title>
                Dettagli prenotazione
            </Modal.Title>
            <Modal.Content>
                {reservation && <ReservationDetail reservation={reservation}/>}
            </Modal.Content>
        </Modal.Container>
    );

    return (
        <>
            <LocationDetailGallery pictures={location?.pictures} onRemoveImage={handleRemoveImage} />
            <LocationEditForm location={location} onEditLocation={handleUpdateLocation} loading={editLocationLoading} />
            <ReservationCalendar location={location} onClickReservation={handleReservationClick}/>
        </>
    )
}

export default MyAccountLocationDetail;
