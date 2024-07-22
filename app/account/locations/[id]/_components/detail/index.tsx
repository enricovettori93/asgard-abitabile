"use client"

import useGetLocationDetail from "@/app/account/locations/[id]/_components/detail/hooks/useGetLocationDetail";
import {memo, useCallback, useContext, useEffect, useRef} from "react";
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
import useManageTag from "@/app/account/locations/[id]/_components/detail/hooks/useManageTag";
const ReservationCalendar = memo(dynamic(() => import("@/app/account/locations/[id]/_components/detail/reservations-calendar"), {ssr: false}));

const MyAccountLocationDetail = () => {
    const {id} = useParams<{id: Location["id"]}>();
    const {isPending: getLocationLoading, location} = useGetLocationDetail(id);
    const {isPending: deleteLocationLoading, deleteLocation} = useDeleteLocation(id);
    const {isPending: confirmLoading, confirmReservation} = useConfirmReservation();
    const {isPending: tagsLoading, tags, error: errorTags} = useGetTags();
    const {loading: editLocationLoading, editLocation, errors} = useEditLocation();
    const {getReservationDetail, reservation} = useGetReservationDetail();
    const {loading: removeImageLoading, removeImage} = useRemoveImage();
    const {reservations, getReservations} = useGetReservations();
    const {loading: manageTagLoading,unlinkTag, linkTag} = useManageTag();
    const {setModal, removeModal} = useContext(UiContext);
    const startDateRef = useRef(new Date());
    const endDateRef = useRef(new Date());

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

    const handleChangeDate = useCallback(async (startDate: Date, endDate: Date) => {
        startDateRef.current = startDate;
        endDateRef.current = endDate;
        await getReservations(id,{startDate, endDate});
    }, [getReservations]);

    const handleConfirmReservation = async (reservation: Reservation["id"]) => {
        await confirmReservation(reservation);
        removeModal();
    }

    const handleConfirmDeleteImage = async (pictureId: Picture["id"]) => {
        await removeImage(location!.id, pictureId);
        // await getLocationDetail(id);
        removeModal();
    }

    const handleConfirmDeleteLocation = async () => {
        await deleteLocation(id);
        removeModal();
    }

    const handleUpdateLocation = async (payload: EditLocationForm) => {
        await editLocation(location!.id, payload);
        // await getLocationDetail(id);
    }

    const handleLinkTag = async (tagId: Tag["id"]) => {
        await linkTag(tagId, location!.id);
        // await getLocationDetail(id);
    }

    const handleUnlinkTag = async (tagId: Tag["id"]) => {
        await unlinkTag(tagId, location!.id);
        // await getLocationDetail(id);
    }

    const handleReservationClick = useCallback(async (reservationId: Reservation["id"]) => {
        await getReservationDetail(location!.id, reservationId!);
    }, [getReservationDetail]);

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

    const handleDeleteLocation = async () => {
        removeModal();
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
                <h2 className="text-3xl">Gestisci i dettagli della location</h2>
                <Card>
                    <Accordion title="Immagini presenti">
                        <LocationDetailGallery className="pt-10" pictures={location?.pictures} onRemoveImage={handleDeleteImage}/>
                    </Accordion>
                </Card>
                <Card>
                    <Accordion title="Dati della locations">
                        <LocationEditForm location={location} onEditLocation={handleUpdateLocation} loading={editLocationLoading} errors={errors}/>
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
