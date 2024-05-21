import {NextRequest, NextResponse} from "next/server";
import {getUserIdFromRequest} from "@/utils/session";
import {ResponseDTO} from "@/types/common";
import ReservationRepository from "@/repositories/reservation.repository";
import NotAllowed from "@/errors/not-allowed";

interface Params {
    params: {
        id: string
    }
}

export async function DELETE(request: NextRequest, {params}: Params) {
    const userId = await getUserIdFromRequest();
    const {id} = params;

    try {
        const reservationDetail = await ReservationRepository.get(id);
        if (reservationDetail.userId !== userId) {
            throw new NotAllowed();
        }
        await ReservationRepository.delete(id);
        return NextResponse.json({
            message: "Reservation deleted"
        } satisfies ResponseDTO<never>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
