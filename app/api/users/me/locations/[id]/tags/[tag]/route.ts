import {NextRequest, NextResponse} from "next/server";
import {Location, Tag} from "@prisma/client";
import {ResponseDTO} from "@/types/common";
import {getUserIdFromRequest} from "@/utils/session";
import LocationRepository from "@/repositories/location.repository";
import NotAllowed from "@/errors/not-allowed";
import TagRepository from "@/repositories/tag.repository";

interface Params {
    params: {
        id: Location["id"]
        tag: Tag["id"]
    }
}

export async function DELETE(req: NextRequest, {params}: Params) {
    const {id: locationId, tag: tagId} = params;
    const userId = await getUserIdFromRequest();

    try {
        const location = await LocationRepository.get(locationId);
        if (location.userId !== userId) {
            throw new NotAllowed();
        }

        await TagRepository.unlinkTagFromLocation(tagId, locationId);

        return NextResponse.json({
            message: "Tag removed from location"
        } satisfies ResponseDTO<never>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}

export async function PATCH(req: NextRequest, {params}: Params) {
    const {id: locationId, tag: tagId} = params;
    const userId = await getUserIdFromRequest();

    try {
        const location = await LocationRepository.get(locationId);
        if (location.userId !== userId) {
            throw new NotAllowed();
        }

        await TagRepository.linkTagToLocation(tagId, locationId);

        return NextResponse.json({
            message: "Tag added to location"
        } satisfies ResponseDTO<never>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
