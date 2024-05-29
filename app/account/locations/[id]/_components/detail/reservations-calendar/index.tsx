"use client"

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import {Reservation} from "@prisma/client";
import {mapDateToStringForInputs} from "@/utils/functions";

interface props {
    reservations: Reservation[]
    onClickReservation: (id: Reservation["id"]) => void
    onChangeDate: (startDate: Date, endDate: Date) => void
}

const ReservationCalendar = ({reservations, onClickReservation, onChangeDate}: props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
            <div className="col-span-2">
                <FullCalendar
                    events={reservations?.map(reservation => ({
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
                    datesSet={({start, end}) => onChangeDate(start, end)}
                />
            </div>
            <div className="flex flex-col col-span-1">
                <p className="text-3xl mb-4">Elenco delle prenotazioni</p>
                {
                    reservations?.length === 0 && (<p>Nessuna prenotazione presente.</p>)
                }
                {
                    reservations?.map(reservation => (
                        <button key={reservation.id} onClick={() => onClickReservation(reservation.id)}
                                className="mr-auto with-hover-border flex gap-2 py-1">
                            {reservation.confirmed ? (<i className="fi fi-rr-badge-check text-green-400 mt-1"></i>) : (<i className="fi fi-tr-highlighter text-orange-400 mt-1"></i>)}
                            <div className="text-left">
                                <span>{mapDateToStringForInputs(new Date(reservation.startDate))}&nbsp;/&nbsp;{mapDateToStringForInputs(new Date(reservation.endDate))}</span>
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
