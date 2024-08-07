"use client"

import useGetLocationDetail from "@/app/account/locations/[id]/_components/detail/hooks/useGetLocationDetail";
import {memo, useContext, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {Location, Picture, Reservation, Tag} from "@prisma/client";
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
import Accordion from "@/components/accordion";
import Card from "@/components/card";
import useGetReservations from "@/app/account/locations/[id]/_components/detail/hooks/useGetReservations";
import DeleteLocationModal from "@/app/account/locations/[id]/_components/detail/modals/delete-location";
import useDeleteLocation from "@/app/account/locations/[id]/_components/detail/hooks/useDeleteLocation";
import useGetTags from "@/app/account/locations/[id]/_components/detail/hooks/useGetTags";
import LocationTags from "@/app/account/locations/[id]/_components/detail/location-tags";
import useLinkTag from "@/app/account/locations/[id]/_components/detail/hooks/useLinkTag";
import useUnlinkTag from "@/app/account/locations/[id]/_components/detail/hooks/useUnlinkTag";
const ReservationCalendar = memo(dynamic(() => import("@/app/account/locations/[id]/_components/detail/reservations-calendar"), {ssr: false}));

const MyAccountLocationDetail = () => {
    const [reservationDates, setReservationDates] = useState<{startDate: Date | null, endDate: Date | null}>({
        startDate: null,
        endDate: null
    });
    const [reservationIdSelected, setReservationIdSelected] = useState<Reservation["id"] | null>(null);
    const {id} = useParams<{id: Location["id"]}>();
    const {isPending: getLocationLoading, location} = useGetLocationDetail(id);
    const {isPending: deleteLocationLoading, deleteLocation} = useDeleteLocation(id);
    const {isPending: confirmLoading, confirmReservation} = useConfirmReservation();
    const {reservations} = useGetReservations(id, {startDate: reservationDates.startDate, endDate: reservationDates.endDate});
    const {reservation} = useGetReservationDetail(id, reservationIdSelected);
    const {isPending: tagsLoading, tags, error: errorTags} = useGetTags();
    const {loading: editLocationLoading, editLocation, errors} = useEditLocation(id);
    const {loading: removeImageLoading, removeImage} = useRemoveImage();
    const {linkTag} = useLinkTag();
    const {unlinkTag} = useUnlinkTag();
    const {setModal, removeModal} = useContext(UiContext);

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

    const handleChangeDate = (startDate: Date, endDate: Date) => {
        setReservationDates({startDate, endDate});
    };

    const handleConfirmReservation = async (reservation: Reservation["id"]) => {
        await confirmReservation({ locationId: location!.id, reservationId: reservation});
        removeModal();
    }

    const handleConfirmDeleteImage = async (pictureId: Picture["id"]) => {
        await removeImage({ locationId: location!.id, pictureId });
        removeModal();
    }

    const handleConfirmDeleteLocation = async () => {
        await deleteLocation(id);
        removeModal();
    }

    const handleUpdateLocation = async (payload: EditLocationForm) => {
        await editLocation({ id: location!.id, payload });
    }

    const handleLinkTag = async (tagId: Tag["id"]) => {
        await linkTag({ locationId: location!.id, tagId });
    }

    const handleUnlinkTag = async (tagId: Tag["id"]) => {
        await unlinkTag({ locationId: location!.id, tagId });
    }

    const handleReservationClick = (reservationId: Reservation["id"]) => {
        setReservationIdSelected(reservationId);
    };

    const handleDeleteImage = async (pictureId: Picture["id"]) => {
        setModal(
            <DeleteImageModal
                loading={removeImageLoading}
                closeModal={removeModal}
                onConfirmDeleteImage={() => handleConfirmDeleteImage(pictureId)}
            />
        );
    }

    const handleDeleteLocation = async () => {
        setModal(
            <DeleteLocationModal
                loading={deleteLocationLoading}
                closeModal={removeModal}
                onConfirmDeleteLocation={handleConfirmDeleteLocation}
            />
        )
    }

    if (getLocationLoading) {
        return (<p>Loading location..</p>);
    }

    if (!location) {
        return (<p>Location not found</p>);
    }

    return (
        <>
            <div>
                <h2 className="text-3xl mb-5">Calendario prenotazioni</h2>
                <ReservationCalendar onChangeDate={handleChangeDate} reservations={reservations} onClickReservation={handleReservationClick}/>
            </div>
            <div className="mt-10 flex flex-col gap-5">
                <Card>
                    <Accordion title="Dati della locations">
                        <LocationEditForm location={location} onEditLocation={handleUpdateLocation} loading={editLocationLoading} errors={errors}/>
                    </Accordion>
                </Card>
                <Card>
                    <Accordion title="Immagini presenti">
                        <LocationDetailGallery className="pt-10" pictures={location?.pictures} onRemoveImage={handleDeleteImage}/>
                    </Accordion>
                </Card>
                {
                    !tagsLoading && (
                        <Card>
                            <Accordion title="Tags">
                                {errorTags && <p>Errore nel reperimento dei tags</p>}
                                <LocationTags tags={tags} locationTags={location.tags} onAdd={handleLinkTag} onRemove={handleUnlinkTag}/>
                            </Accordion>
                        </Card>
                    )
                }
                <div className="flex justify-end my-5">
                    <button onClick={handleDeleteLocation} className="button button--danger">Cancella la location</button>
                </div>
            </div>
        </>
    )
}

export default MyAccountLocationDetail;
