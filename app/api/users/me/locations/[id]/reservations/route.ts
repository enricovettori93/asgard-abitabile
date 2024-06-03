import {getUserIdFromRequest} from "@/utils/session";
import {NextRequest, NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";
import LocationRepository from "@/repositories/location.repository";
import NotAllowed from "@/errors/not-allowed";
import ReservationRepository from "@/repositories/reservation.repository";
import {Location, Reservation} from "@prisma/client";
import NotAcceptable from "@/errors/not-acceptable";
import {LocationReserveSchema} from "@/utils/validators";
import {transformValidationErrors} from "@/utils/functions";
import {AddReservation} from "@/types/reservation";

interface Params {
    params: { id: Location["id"] }
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
            message: "Dati del form non validi",
            errors: transformValidationErrors(validationResult)
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    try {
        const location = await LocationRepository.get(id);

        if (location.userId !== userId || !location.published) {
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
