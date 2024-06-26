import {NextRequest, NextResponse} from "next/server";
import {getUserIdFromRequest} from "@/utils/session";
import LocationRepository from "@/repositories/location.repository";
import {ResponseDTO} from "@/types/common";
import {LocationWithPicturesAndUserAndTags} from "@/types/location";
import {Location} from "@prisma/client";
import {LocationSchema} from "@/utils/validators";
import {transformValidationErrors} from "@/utils/functions";
import NotAllowed from "@/errors/not-allowed";
import PictureRepository from "@/repositories/picture.repository";
import {removeLocationImageFolder} from "@/utils/fs";

interface Params {
    params: { id: Location["id"] }
}

export async function GET(request: NextRequest, {params}: Params) {
    const userId = await getUserIdFromRequest();
    const {id} = params;

    try {
        const data = await LocationRepository.get(id);

        if (userId !== data.userId) {
            return NextResponse.json({
                message: "User is not the location's owner"
            } satisfies ResponseDTO<never>, {
                status: 403
            });
        }

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

export async function DELETE(request: Request, {params}: Params) {
    const userId = await getUserIdFromRequest();
    const {id} = params;

    try {
        const location = await LocationRepository.getWithReservations(id);

        if (userId !== location.userId) {
            return NextResponse.json({
                message: "User is not the location's owner"
            } satisfies ResponseDTO<never>, {
                status: 403
            });
        }

        if (location.reservations.length > 0) {
            return NextResponse.json({
                message: "Cannot delete location, has reservations"
            } satisfies ResponseDTO<never>, {
                status: 406
            });
        }

        await removeLocationImageFolder(id);
        await PictureRepository.deleteManyByLocation(id);
        await LocationRepository.delete(id);

        return NextResponse.json({
            message: "Location deleted"
        } satisfies ResponseDTO<never>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}

export async function PATCH(request: Request, {params}: Params) {
    const {id} = params;
    const userId = await getUserIdFromRequest();
    const body = await request.json();

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
        const {pictures, ...rest} = body;
        const location = await LocationRepository.get(id);
        if (location.userId !== userId) {
            throw new NotAllowed();
        }
        const data = await LocationRepository.update(id, rest);

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
