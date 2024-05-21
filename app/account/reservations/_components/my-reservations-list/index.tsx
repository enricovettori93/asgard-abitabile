"use client"

import useMyReservations from "@/app/account/reservations/_components/my-reservations-list/hooks/useMyReservations";
import {useEffect} from "react";
import Card from "@/components/card";
import {mapDateToStringForInputs} from "@/utils/functions";
import useDeleteMyReservation
    from "@/app/account/reservations/_components/my-reservations-list/hooks/useDeleteMyReservation";
import {Reservation} from "@prisma/client";

const MyReservationList = () => {
    const {loading, reservations, getMyReservations} = useMyReservations();
    const {loading: deleteLoading, deleteReservation} = useDeleteMyReservation();

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
                        <span>{reservation.location.title}</span>
                    </div>
                    <button onClick={() => handleDeleteReservation(reservation.id)}
                            disabled={deleteLoading}
                            className="text-red-500 absolute top-5 right-5 rounded-full bg-white hover:bg-red-200 transition-all w-10 h-10 flex items-center justify-center">
                        <i className="fi fi-rr-trash"></i>
                    </button>
                </Card>
            ))}
        </div>
    );
};

export default MyReservationList;
