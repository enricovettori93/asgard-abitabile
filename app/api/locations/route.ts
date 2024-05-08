import LocationRepository from "@/repositories/location.repository";
import {NextRequest} from "next/server";
import {NewLocationSchema} from "@/utils/validators";
import {NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";
import {LocationWithPictures, LocationWithPicturesAndUser} from "@/types/location";
import {CUSTOM_HEADERS} from "@/utils/constants";

export async function GET(request: NextRequest) {
    const page = Number(request.nextUrl.searchParams.get("page")) ?? 1;

    if (page < 1) {
        return NextResponse.json({
            message: "Invalid pagination"
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    const queryParams = {
        skip: page - 1
    };

    const data = await LocationRepository.getAllPublished(queryParams);
    const count = await LocationRepository.countAllPublished();

    return NextResponse.json({
        data
    } satisfies ResponseDTO<LocationWithPictures[]>, {
        headers: {
            [CUSTOM_HEADERS.X_TOTAL_COUNT]: `${count}`
        }
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const validationResult = NewLocationSchema.safeParse(body);

    if (!validationResult.success) {
        const errors = Object.fromEntries(
            validationResult.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
        );
        return NextResponse.json({
            errors
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    // todo: take userId from cookies
    const data = await LocationRepository.add({
        ...body,
        userId: "67caec95-0da3-4aa0-953d-e03332c795d5"
    });

    return NextResponse.json({
        data
    } satisfies ResponseDTO<LocationWithPicturesAndUser>);
}
