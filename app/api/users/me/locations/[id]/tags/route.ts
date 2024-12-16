import {NextRequest, NextResponse} from "next/server";
import {Location} from "@prisma/client";
import {getUserIdFromRequest} from "@/utils/session";
import {ResponseDTO} from "@/types/common";
import locationRepository from "@/repositories/location.repository";
import NotAllowed from "@/errors/not-allowed";
import {AddTagsSchema} from "@/utils/validators";
import {transformValidationErrors} from "@/utils/functions";
import TagRepository from "@/repositories/tag.repository";

interface Params {
    params: {
        id: Location["id"]
    }
}

export async function POST(req: NextRequest, {params}: Params) {
    const {id: locationId} = params;
    const userId = await getUserIdFromRequest();
    const body = await req.json();

    const validationResult = AddTagsSchema.safeParse(body);

    if (!validationResult.success) {
        return NextResponse.json({
            message: "Tags non validi",
            errors: transformValidationErrors(validationResult)
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    try {
        const location = await locationRepository.get(locationId);

        if (location.userId !== userId) {
            throw new NotAllowed();
        }

        await TagRepository.linkTagsToLocation(body, locationId);

        return NextResponse.json({
            message: "Tags added to location"
        } satisfies ResponseDTO<never>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        })
    }
}
