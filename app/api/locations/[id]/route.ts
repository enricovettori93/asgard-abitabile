import LocationRepository from "@/repositories/location.repository";
import {NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";
import {LocationWithPicturesAndUser} from "@/types/location";
import {Location} from "@prisma/client";
import {LocationSchema} from "@/utils/validators";
import {transformValidationErrors} from "@/utils/functions";

interface Params {
    params: { id: Location["id"] }
}

export async function GET(request: Request, {params}: Params) {
    const {id} = params;

    try {
        const data = await LocationRepository.get(id);

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

export async function DELETE(request: Request, {params}: Params) {
    // todo: check if user is the owner, remove imgs and then delete the location
    const {id} = params;

    await LocationRepository.delete(id);

    return NextResponse.json({
        message: "Location deleted"
    } satisfies ResponseDTO<never>);
}

export async function PATCH(request: Request, {params}: Params) {
    const {id} = params;
    const body = await request.json();

    const validationResult = LocationSchema.safeParse(body);

    if (!validationResult) {
        return NextResponse.json({
            errors: transformValidationErrors(validationResult)
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    try {
        const {pictures, ...rest} = body;
        const data = await LocationRepository.update(id, rest);

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
