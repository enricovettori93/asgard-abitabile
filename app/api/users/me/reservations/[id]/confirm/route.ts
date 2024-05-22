import {NextRequest, NextResponse} from "next/server";
import {getUserIdFromRequest} from "@/utils/session";
import {ResponseDTO} from "@/types/common";
import ReservationRepository from "@/repositories/reservation.repository";
import NotAllowed from "@/errors/not-allowed";
import {Reservation} from "@prisma/client";

interface Params {
    params: {
        id: string
    }
}

export async function PATCH(request: NextRequest, {params}: Params) {
    const userId = await getUserIdFromRequest();
    const {id} = params;

    try {
        const reservation = await ReservationRepository.getWithLocation(id);
        if (reservation.location.userId !== userId) {
            throw new NotAllowed();
        }
        const data = await ReservationRepository.confirm(id);
        return NextResponse.json({
            data
        } satisfies ResponseDTO<Reservation>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
