import {NextRequest, NextResponse} from "next/server";
import {getUserIdFromRequest} from "@/utils/session";
import ReservationRepository from "@/repositories/reservation.repository";
import {Location} from "@prisma/client";
import {LocationReserveSchema} from "@/utils/validators";
import {transformValidationErrors} from "@/utils/functions";
import {ResponseDTO} from "@/types/common";
import {AddReservation} from "@/types/location";
import LocationRepository from "@/repositories/location.repository";
import NotAllowed from "@/errors/not-allowed";
import NotAcceptable from "@/errors/not-acceptable";

interface Params {
    params: { id: Location["id"] }
}

export async function POST(request: NextRequest, {params}: Params) {
    const {id} = params;
    const body = await request.json();
    const userId = await getUserIdFromRequest();

    const parsedBody = {
        ...body,
        endDate: new Date(body.endDate),
        startDate: new Date(body.startDate)
    };

    const validationResult = LocationReserveSchema.safeParse(parsedBody);

    if (!validationResult.success) {
        return NextResponse.json({
            errors: transformValidationErrors(validationResult)
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    try {
        const location = await LocationRepository.get(id);

        if (location.userId !== userId) {
            throw new NotAllowed();
        }

        const data: AddReservation = {
            ...parsedBody,
            locationId: id,
            userId
        }

        const reservations = await ReservationRepository.getReservationBetweenDate(id, data.startDate, data.endDate);

        if (reservations.length > 0) {
            throw new NotAcceptable("Resource already reserved for the selected period");
        }

        const reservation = await ReservationRepository.createReservation(data);

        return NextResponse.json({
            data: reservation
        });
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
