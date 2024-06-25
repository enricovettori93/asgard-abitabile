import {NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";
import TagRepository from "@/repositories/tag.repository";
import {Tag} from "@prisma/client";
import {CUSTOM_HEADERS} from "@/utils/constants";

export async function GET() {
    try {
        const tags = await TagRepository.getAll();

        return NextResponse.json({
            data: tags,
        } satisfies ResponseDTO<Tag[]>, {
            headers: {
                [CUSTOM_HEADERS.X_TOTAL_COUNT]: `${tags.length}`
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
