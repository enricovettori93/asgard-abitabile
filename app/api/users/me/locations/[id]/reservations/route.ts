import {getUserIdFromRequest} from "@/utils/session";
import {NextRequest, NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";
import LocationRepository from "@/repositories/location.repository";
import NotAllowed from "@/errors/not-allowed";
import ReservationRepository from "@/repositories/reservation.repository";
import {Reservation} from "@prisma/client";
import NotAcceptable from "@/errors/not-acceptable";

interface Params {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, {params}: Params) {
    const userId = await getUserIdFromRequest();
    const {id} = params;
    const startDate = request.nextUrl.searchParams.get("startDate");
    const endDate = request.nextUrl.searchParams.get("endDate");

    try {
        if (!startDate || !endDate) {
            throw new NotAcceptable("Missing dates");
        }

        const location = await LocationRepository.get(id);

        if (location.userId !== userId) {
            throw new NotAllowed();
        }

        const data = await ReservationRepository.getReservationBetweenDate(id, new Date(startDate), new Date(endDate));

        return NextResponse.json({
            data: data
        } satisfies ResponseDTO<Reservation[]>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
