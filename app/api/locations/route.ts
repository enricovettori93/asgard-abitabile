import LocationRepository from "@/repositories/location.repository";
import {NextRequest} from "next/server";
import {NewLocationSchema} from "@/utils/validators";

export async function GET(request: NextRequest) {
    const page = request.nextUrl.searchParams.get("page") || 1;

    const queryParams = {
        skip: +page
    };

    const data = await LocationRepository.getAllPublished(queryParams);

    return Response.json({data});
}

export async function POST(request: Request) {
    const body = await request.json();
    const validationResult = NewLocationSchema.safeParse(body);

    if (!validationResult.success) {
        const errors = Object.fromEntries(
            validationResult.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
        );
        return Response.json({errors});
    }

    // todo: take userId from cookies
    const data = await LocationRepository.add({
        ...body,
        userId: "67caec95-0da3-4aa0-953d-e03332c795d5"
    });

    return Response.json({data});
}
