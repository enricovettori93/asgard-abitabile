"use client"

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import {Reservation} from "@prisma/client";
import {mapDateToStringForInputs} from "@/utils/functions";

interface props {
    reservations?: Reservation[]
    onClickReservation: (id: Reservation["id"]) => void
    onChangeDate: (startDate: Date, endDate: Date) => void
}

const ReservationCalendar = ({reservations = [], onClickReservation, onChangeDate}: props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
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
            <div className="flex flex-col">
                <p className="text-3xl mb-4">Elenco delle prenotazioni</p>
                {
                    reservations?.length === 0 && (<p>Nessuna prenotazione presente.</p>)
                }
                {
                    reservations?.map(reservation => (
                        <button key={reservation.id} onClick={() => onClickReservation(reservation.id)}
                                className="mr-auto with-hover-border flex items-center gap-1 py-1">
                            <i className="fi fi-tr-file-circle-info mt-1"></i>&nbsp;
                            <div>
                                <span>{mapDateToStringForInputs(new Date(reservation.startDate))}&nbsp;/&nbsp;{mapDateToStringForInputs(new Date(reservation.endDate))}</span>
                                &nbsp;-&nbsp;
                                <span>{reservation.adultsForNight} {reservation.adultsForNight === 1 ? "persona" : "persone"}</span>
                                &nbsp;{reservation.confirmed ? (<i className="fi fi-rr-badge-check text-green-400"></i>) : (<i className="fi fi-tr-highlighter text-orange-400"></i>)}
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export default ReservationCalendar;
