import LocationRepository from "@/repositories/location.repository";
import {NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";
import {LocationWithPicturesAndUser} from "@/types/location";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, {params}: Params) {
    const {id} = params;

    const data = await LocationRepository.get(id);

    if (!data) {
        return NextResponse.json({
            message: "Location not found"
        } satisfies ResponseDTO<never>, {
            status: 404
        });
    }

    return NextResponse.json({
        data
    } satisfies ResponseDTO<LocationWithPicturesAndUser>);
}

export async function DELETE(request: Request, {params}: Params) {
    const {id} = params;

    await LocationRepository.delete(id);

    return NextResponse.json({
        message: "Location deleted"
    } satisfies ResponseDTO<never>);
}
