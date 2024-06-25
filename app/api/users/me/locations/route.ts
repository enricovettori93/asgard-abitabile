import {NextRequest, NextResponse} from "next/server";
import {getUserIdFromRequest} from "@/utils/session";
import {ResponseDTO} from "@/types/common";
import LocationRepository from "@/repositories/location.repository";
import {AddLocationForm, LocationWithPictures, LocationWithPicturesAndUserAndTags} from "@/types/location";
import {CUSTOM_HEADERS} from "@/utils/constants";
import {LocationSchema} from "@/utils/validators";
import {transformValidationErrors} from "@/utils/functions";

export async function GET(request: NextRequest) {
    const userId = await getUserIdFromRequest();

    try {
        const {data, count} = await LocationRepository.getAllByUser(userId);

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
            message: "Dati del form non validi",
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
        } satisfies ResponseDTO<LocationWithPicturesAndUserAndTags>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
