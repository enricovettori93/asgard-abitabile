import {NextRequest, NextResponse} from "next/server";
import LocationRepository from "@/repositories/location.repository";
import {getUserIdFromRequest} from "@/utils/session";
import NotAllowed from "@/errors/not-allowed";
import ReservationRepository from "@/repositories/reservation.repository";
import {ResponseDTO} from "@/types/common";
import {ReservationWithUser} from "@/types/reservation";
import {Location, Reservation} from "@prisma/client";

interface params {
    params: {
        id: Location["id"]
        reservation: Reservation["id"]
    }
}

export async function GET(request: NextRequest, {params}: params) {
    const {id: locationId, reservation: reservationId} = params;
    const userId = await getUserIdFromRequest();

    try {
        const location = await LocationRepository.get(locationId);
        const reservation = await ReservationRepository.getWithUser(reservationId);

        if (location.userId !== userId && reservation.userId !== userId) {
            throw new NotAllowed();
        }

        return NextResponse.json({
            data: reservation
        } satisfies ResponseDTO<ReservationWithUser>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        }, {
            status: e.statusCode || 500
        })
    }
}
