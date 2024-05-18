import {NextRequest, NextResponse} from "next/server";
import {getUserIdFromRequest} from "@/utils/session";
import {ResponseDTO} from "@/types/common";
import LocationRepository from "@/repositories/location.repository";
import {LocationWithPictures} from "@/types/location";
import {CUSTOM_HEADERS} from "@/utils/constants";

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
