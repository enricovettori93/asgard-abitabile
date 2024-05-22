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
    const {loading, reservations, getMyReservations} = useMyReservations();
    const {loading: deleteLoading, deleteReservation} = useDeleteMyReservation();
    const {removeModal, setModal} = useContext(UiContext);

    useEffect(() => {
        getMyReservations();
    }, []);

    if (loading) {
        return (<p>Loading...</p>);
    }

    if (reservations.length === 0) {
        return (
            <p>Nessuna prenotazione trovata</p>
        );
    }

    const handleDeleteReservation = async (id: Reservation["id"]) => {
        await deleteReservation(id);
        await getMyReservations();
        removeModal();
    }

    const showModalForDeleteReservation = (id: Reservation["id"]) => {
        setModal(<DeleteReservationModal closeModal={removeModal} handleDeleteReservation={() => handleDeleteReservation(id)}/>);
    }

    return (
        <div className="flex flex-col gap-5">
            {reservations.map((reservation) => (
                <Card key={reservation.id} className="relative">
                    <div>
                        <span className="font-semibold">Data Prenotazione:</span>
                        <span>{mapDateToStringForInputs(new Date(reservation.createdAt))}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Da:</span>
                        <span>{mapDateToStringForInputs(new Date(reservation.startDate))}</span>
                    </div>
                    <div>
                        <span className="font-semibold">A:</span>
                        <span>{mapDateToStringForInputs(new Date(reservation.endDate))}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Numero persone:</span>
                        <span>{reservation.adultsForNight}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Location:</span>
                        <Link className="with-hover-border text-orange-400 font-semibold" href={`${ROUTES.LOCATIONS}/${reservation.locationId}`}>{reservation.location.title}</Link>
                    </div>
                    <div>
                        <span className="font-semibold">Stato della prenotazione:</span>
                        {
                            reservation.confirmed && (
                                <span>la prenotazione é stata confermata dall'host, non é piú possibile cancellarla.</span>
                            )
                        }
                        {
                            !reservation.confirmed && (
                                <span>la prenotazione è in attesa di conferma dall'host, puoi ancora cancellarla.</span>
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
