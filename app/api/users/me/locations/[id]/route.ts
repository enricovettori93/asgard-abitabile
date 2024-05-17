import {NextRequest, NextResponse} from "next/server";
import {getUserIdFromRequest} from "@/utils/session";
import LocationRepository from "@/repositories/location.repository";
import {ResponseDTO} from "@/types/common";
import {LocationWithPicturesAndUser} from "@/types/location";

interface Params {
    params: { id: string }
}

export async function GET(request: NextRequest, {params}: Params) {
    const userId = await getUserIdFromRequest();
    const {id} = params;

    const data = await LocationRepository.get(id);

    if (!data) {
        return NextResponse.json({
            message: "Location not found"
        } satisfies ResponseDTO<never>, {
            status: 404
        });
    }

    if (userId !== data.userId) {
        return NextResponse.json({
            message: "User is not the location's owner"
        } satisfies ResponseDTO<never>, {
            status: 403
        });
    }

    return NextResponse.json({
        data
    } satisfies ResponseDTO<LocationWithPicturesAndUser>);
}
