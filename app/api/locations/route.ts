import LocationRepository from "@/repositories/location.repository";
import {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";
import {
    LocationAvailableWithPictures,
} from "@/types/location";
import {ADULTS_PER_NIGHT, CUSTOM_HEADERS} from "@/utils/constants";
import NotAcceptable from "@/errors/not-acceptable";
import ReservationRepository from "@/repositories/reservation.repository";

export async function GET(request: NextRequest) {
    const page = Number(request.nextUrl.searchParams.get("page")) ?? 1;
    const maxAdultsForNight = request.nextUrl.searchParams.get("maxAdultsForNight");
    const priceForNight = request.nextUrl.searchParams.get("priceForNight");
    const startDate = request.nextUrl.searchParams.get("startDate");
    const endDate = request.nextUrl.searchParams.get("endDate");

    // todo: create a zod schema just for this custom validation considering pagination
    if (page < 1 || maxAdultsForNight !== null && (Number(maxAdultsForNight) < ADULTS_PER_NIGHT.MIN || Number(maxAdultsForNight) > ADULTS_PER_NIGHT.MAX)) {
        throw new NotAcceptable();
    }

    const filters: Record<string, any> = {};

    filters.skip = page - 1;

    if (maxAdultsForNight !== null) {
        filters.maxAdultsForNight = Number(maxAdultsForNight);
    }

    if (priceForNight !== null) {
        filters.priceForNight = Number(priceForNight);
    }

    try {
        const {data, count} = await LocationRepository.filter(filters);

        if (!startDate || !endDate) {
            return NextResponse.json({
                data: data.map(d => ({...d, isAvailable: true}))
            } satisfies ResponseDTO<LocationAvailableWithPictures[]>, {
                headers: {
                    [CUSTOM_HEADERS.X_TOTAL_COUNT]: `${count}`
                }
            });
        }

        const availableData: LocationAvailableWithPictures[] = await Promise.all(data.map(async location => {
            const checkAvailability = await ReservationRepository.getReservationBetweenDate(location.id, new Date(startDate), new Date(endDate));

            return {
                ...location,
                isAvailable: checkAvailability.length === 0
            };
        }));

        return NextResponse.json({
            data: availableData
        } satisfies ResponseDTO<LocationAvailableWithPictures[]>, {
            headers: {
                [CUSTOM_HEADERS.X_TOTAL_COUNT]: `${count}`
            }
        });
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
