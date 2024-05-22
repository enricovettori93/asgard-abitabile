"use client"

import {LocationWithPicturesAndReservations} from "@/types/location";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import {Reservation} from "@prisma/client";
import {mapDateToStringForInputs} from "@/utils/functions";

interface props {
    location: LocationWithPicturesAndReservations
    onClickReservation: (id: Reservation["id"]) => void
}

const ReservationCalendar = ({location, onClickReservation}: props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            <FullCalendar
                events={location?.reservations?.map(reservation => ({
                    start: reservation.startDate,
                    end: reservation.endDate,
                    title: `${reservation.adultsForNight} ${reservation.adultsForNight === 1 ? "persona" : "persone"}`,
                    id: reservation.id,
                    backgroundColor: reservation.confirmed ? "#4caf50" : "#36b2f4",
                    borderColor: reservation.confirmed ? "#4caf50" : "#36b2f4",
                }))}
                eventClick={({event: {id}}) => onClickReservation(id)}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
            />
            <div className="flex flex-col">
                <p className="text-3xl mb-4">Elenco delle prenotazioni</p>
                {
                    location?.reservations?.length === 0 && (<p>Nessuna prenotazione presente.</p>)
                }
                {
                    location?.reservations?.map(reservation => (
                        <button key={reservation.id} onClick={() => onClickReservation(reservation.id)}
                                className="mr-auto with-hover-border flex items-center gap-1 py-1">
                            <i className="fi fi-tr-file-circle-info mt-1"></i>&nbsp;
                            <div>
                                <span>Da {mapDateToStringForInputs(new Date(reservation.startDate))} A {mapDateToStringForInputs(new Date(reservation.endDate))}</span>
                                &nbsp;-&nbsp;
                                <span>{reservation.adultsForNight} {reservation.adultsForNight === 1 ? "persona" : "persone"}</span>
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export default ReservationCalendar;
