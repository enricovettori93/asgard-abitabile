import LocationRepository from "@/repositories/location.repository";
import {NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";
import {LocationWithPicturesAndUserAndTags} from "@/types/location";
import {Location} from "@prisma/client";

interface Params {
    params: { id: Location["id"] }
}

export async function GET(request: Request, {params}: Params) {
    const {id} = params;

    try {
        const data = await LocationRepository.get(id);

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
