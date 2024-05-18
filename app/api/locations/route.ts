import LocationRepository from "@/repositories/location.repository";
import {NextRequest} from "next/server";
import {LocationSchema} from "@/utils/validators";
import {NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";
import {AddLocationForm, LocationWithPictures, LocationWithPicturesAndUser} from "@/types/location";
import {ADULTS_PER_NIGHT, CUSTOM_HEADERS} from "@/utils/constants";
import {transformValidationErrors} from "@/utils/functions";
import {getUserIdFromRequest} from "@/utils/session";

export async function GET(request: NextRequest) {
    const page = Number(request.nextUrl.searchParams.get("page")) ?? 1;
    const maxAdultsForNight = request.nextUrl.searchParams.get("maxAdultsForNight");
    const priceForNight = request.nextUrl.searchParams.get("priceForNight");

    // todo: create a zod schema just for this custom validation considering pagination
    if (page < 1 || maxAdultsForNight !== null && (Number(maxAdultsForNight) < ADULTS_PER_NIGHT.MIN || Number(maxAdultsForNight) > ADULTS_PER_NIGHT.MAX)) {
        return NextResponse.json({
            message: "Invalid request"
        } satisfies ResponseDTO<never>, {
            status: 406
        });
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

        return NextResponse.json({
            data
        } satisfies ResponseDTO<LocationWithPictures[]>, {
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

export async function POST(request: Request) {
    const body: AddLocationForm = await request.json();
    const userId = await getUserIdFromRequest();
    const validationResult = LocationSchema.safeParse(body);

    if (!validationResult.success) {
        return NextResponse.json({
            errors: transformValidationErrors(validationResult)
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    try {
        const data = await LocationRepository.add({
            ...body,
            userId
        });

        return NextResponse.json({
            data
        } satisfies ResponseDTO<LocationWithPicturesAndUser>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
