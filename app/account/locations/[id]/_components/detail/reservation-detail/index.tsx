import React from 'react';
import {mapDateToStringForInputs} from "@/utils/functions";
import {ReservationWithUser} from "@/types/reservation";

interface props {
    reservation: ReservationWithUser
}

const ReservationDetail = ({reservation}: props) => {
    return (
        <div className="flex flex-col gap-1">
            <div>
                <span className="font-semibold">Adulti:</span>&nbsp;
                <span>{reservation.adultsForNight}</span>
            </div>
            <div className="flex gap-2">
                <div>
                    <span className="font-semibold">Da:</span>&nbsp;
                    <span>{mapDateToStringForInputs(new Date(reservation.startDate))}</span>
                </div>
                <div>
                    <span className="font-semibold">A:</span>&nbsp;
                    <span>{mapDateToStringForInputs(new Date(reservation.endDate))}</span>
                </div>
            </div>
            <div>
                <span className="font-semibold">Effettuata in data:</span>&nbsp;
                <span>{mapDateToStringForInputs(new Date(reservation.createdAt))}</span>
            </div>
            <div>
                <span className="font-semibold">Dall'utente:</span>&nbsp;
                <span>{reservation.user.name}&nbsp;{reservation.user.surname}</span>
            </div>
        </div>
    );
};

export default ReservationDetail;
