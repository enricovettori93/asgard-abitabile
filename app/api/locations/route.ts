import LocationRepository from "@/repositories/location.repository";
import {NextRequest} from "next/server";
import {NewLocationSchema} from "@/utils/validators";
import {NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";
import {LocationWithPictures, LocationWithPicturesAndUser} from "@/types/location";
import {ADULTS_PER_NIGHT, CUSTOM_HEADERS} from "@/utils/constants";

export async function GET(request: NextRequest) {
    const page = Number(request.nextUrl.searchParams.get("page")) ?? 1;
    const maxAdultsForNight = request.nextUrl.searchParams.get("maxAdultsForNight");

    if (page < 1 || maxAdultsForNight !== null && (Number(maxAdultsForNight) < ADULTS_PER_NIGHT.MIN || Number(maxAdultsForNight) > ADULTS_PER_NIGHT.MAX)) {
        return NextResponse.json({
            message: "Invalid request"
        } satisfies ResponseDTO<never>, {
            status: 406
        });
    }

    const filters: any = {};

    filters.skip = page - 1;

    if (maxAdultsForNight !== null) {
        filters.maxAdultsForNight = Number(maxAdultsForNight);
    }

    const {data, count} = await LocationRepository.filter(filters);

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
        userId: "7516b1f6-40dd-4b38-9855-34f7307f63c7"
    });

    return NextResponse.json({
        data
    } satisfies ResponseDTO<LocationWithPicturesAndUser>);
}
