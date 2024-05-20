"use client"

import {LocationWithPicturesAndReservations} from "@/types/location";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import {Reservation} from "@prisma/client";

interface props {
    location: LocationWithPicturesAndReservations
    onClickReservation: (id: Reservation["id"]) => void
}

const ReservationCalendar = ({location, onClickReservation}: props) => {
    return (
        <FullCalendar
            events={location?.reservations?.map(reservation => ({
                start: reservation.startDate,
                end: reservation.endDate,
                title: `${reservation.adultsForNight} ${reservation.adultsForNight === 1 ? "persona" : "persone"}`,
                id: reservation.id
            }))}
            eventClick={({event: {id}}) => onClickReservation(id)}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
        />
    );
};

export default ReservationCalendar;
