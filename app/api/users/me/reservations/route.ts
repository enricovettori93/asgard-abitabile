import {NextRequest, NextResponse} from "next/server";
import {getUserIdFromRequest} from "@/utils/session";
import ReservationRepository from "@/repositories/reservation.repository";
import {ResponseDTO} from "@/types/common";
import {ReservationWithLocation} from "@/types/reservation";

export async function GET(request: NextRequest) {
    const userId = await getUserIdFromRequest();
    try {
        const reservations = await ReservationRepository.getAllByUser(userId);
        return NextResponse.json({
            data: reservations
        } satisfies ResponseDTO<ReservationWithLocation[]>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        }, {
            status: e.statusCode || 500
        });
    }
}
