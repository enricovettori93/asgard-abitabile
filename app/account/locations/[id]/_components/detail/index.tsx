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
import {ReservationWithUser} from "@/types/reservation";
import useConfirmReservation from "@/app/account/locations/[id]/_components/detail/hooks/useConfirmReservation";
const ReservationCalendar = dynamic(() => import("@/app/account/locations/[id]/_components/detail/reservations-calendar"), {ssr: false});

interface modalProps {
    reservation: ReservationWithUser
    closeModal: () => void
    loading: boolean
    handleConfirmReservation: () => void
}

const DetailReservationModal = ({reservation, closeModal, handleConfirmReservation, loading}: modalProps) => (
    <Modal.Container closeModal={closeModal}>
        <Modal.Title>
            Dettagli prenotazione
        </Modal.Title>
        <Modal.Content>
            <ReservationDetail reservation={reservation}/>
        </Modal.Content>
        <Modal.Actions>
            {
                !reservation.confirmed && (
                    <button
                        className="button--primary"
                        onClick={handleConfirmReservation}
                        disabled={loading}
                    >
                        Conferma prenotazione
                    </button>
                )
            }
        </Modal.Actions>
    </Modal.Container>
)

const MyAccountLocationDetail = () => {
    const {id} = useParams<{id: Location["id"]}>();
    const {loading: getLocationLoading, location, getLocationDetail} = useGetLocationDetail();
    const {loading: editLocationLoading, editLocation} = useEditLocation();
    const {loading: confirmLoading, confirmReservation} = useConfirmReservation();
    const {getReservationDetail, reservation} = useGetReservationDetail();
    const {removeImage} = useRemoveImage();
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
                    handleConfirmReservation={() => handleConfirmReservation(reservation.id)}
                    loading={confirmLoading}
                />
            );
        }
    }, [reservation]);

    const handleConfirmReservation = async (reservation: Reservation["id"]) => {
        await confirmReservation(reservation);
        removeModal();
    }

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

    return (
        <>
            <LocationDetailGallery pictures={location?.pictures} onRemoveImage={handleRemoveImage} />
            <LocationEditForm location={location} onEditLocation={handleUpdateLocation} loading={editLocationLoading} />
            <ReservationCalendar location={location} onClickReservation={handleReservationClick}/>
        </>
    )
}

export default MyAccountLocationDetail;
