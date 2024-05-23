import {NextRequest, NextResponse} from "next/server";
import {getUserIdFromRequest} from "@/utils/session";
import LocationRepository from "@/repositories/location.repository";
import {ResponseDTO} from "@/types/common";
import {LocationWithPicturesAndUser} from "@/types/location";
import {Location} from "@prisma/client";

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
        } satisfies ResponseDTO<LocationWithPicturesAndUser>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
