"use client"

import useMyReservations from "@/app/account/reservations/_components/my-reservations-list/hooks/useMyReservations";
import {useContext, useEffect} from "react";
import Card from "@/components/card";
import {mapDateToStringForInputs} from "@/utils/functions";
import useDeleteMyReservation
    from "@/app/account/reservations/_components/my-reservations-list/hooks/useDeleteMyReservation";
import {Reservation} from "@prisma/client";
import Link from "next/link";
import {ROUTES} from "@/utils/constants";
import Modal from "@/components/modal";
import {UiContext} from "@/context/ui.context";
import ListLoader from "@/components/skeleton-loaders/list-loader";

interface modalProps {
    closeModal: () => void
    handleDeleteReservation: () => void
}

const DeleteReservationModal = ({closeModal, handleDeleteReservation}: modalProps) => (
    <Modal.Container closeModal={closeModal}>
        <Modal.Title>
            Eliminare la prenotazione?
        </Modal.Title>
        <Modal.Content>
            <span>Sei sicuro di voler eliminare la prenotazione?</span>
        </Modal.Content>
        <Modal.Actions>
            <button className="button--danger" onClick={handleDeleteReservation}>Conferma</button>
        </Modal.Actions>
    </Modal.Container>
)

const MyReservationList = () => {
    const {removeModal, setModal} = useContext(UiContext);
    const {isPending: reservationsLoading, reservations} = useMyReservations();
    const {isPending: deleteLoading, deleteReservation} = useDeleteMyReservation();

    if (reservationsLoading) return <ListLoader/>;

    if (reservations.length === 0) {
        return (
            <p>Nessuna prenotazione trovata</p>
        );
    }

    const handleDeleteReservation = async (id: Reservation["id"]) => {
        await deleteReservation(id);
        removeModal();
    }

    const showModalForDeleteReservation = (id: Reservation["id"]) => {
        setModal(<DeleteReservationModal closeModal={removeModal} handleDeleteReservation={() => handleDeleteReservation(id)}/>);
    }

    return (
        <div className="flex flex-col gap-5">
            {reservations.map((reservation) => (
                <Card key={reservation.id} className="relative flex flex-col gap-1">
                    <div className="flex flex-col sm:flex-row">
                        <span className="font-semibold">Effettuata il:&nbsp;</span>
                        <span>{mapDateToStringForInputs(new Date(reservation.createdAt))}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                        <span className="font-semibold">Periodo:&nbsp;</span>
                        <span>{mapDateToStringForInputs(new Date(reservation.startDate))}&nbsp;/&nbsp;{mapDateToStringForInputs(new Date(reservation.endDate))}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                        <span className="font-semibold">Numero persone:&nbsp;</span>
                        <span>{reservation.adultsForNight}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                        <span className="font-semibold">Location:&nbsp;</span>
                        <Link className="with-hover-border text-orange-400 font-semibold" href={`${ROUTES.LOCATIONS}/${reservation.locationId}`}>{reservation.location.title}</Link>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                        <span className="font-semibold">Stato della prenotazione:&nbsp;</span>
                        {
                            reservation.confirmed && (
                                <span><span className="underline font-semibold">confermata</span> dall'host, non é piú possibile cancellarla.</span>
                            )
                        }
                        {
                            !reservation.confirmed && (
                                <span>in attesa di conferma dall'host, puoi ancora cancellarla.</span>
                            )
                        }
                    </div>
                    <button onClick={() => showModalForDeleteReservation(reservation.id)}
                            disabled={reservation.confirmed || deleteLoading}
                            className="text-red-500 absolute top-5 right-5 rounded-full bg-white hover:bg-red-200 transition-all w-10 h-10 flex items-center justify-center">
                        <i className="fi fi-rr-trash"></i>
                    </button>
                </Card>
            ))}
        </div>
    );
};

export default MyReservationList;
