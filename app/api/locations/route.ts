import LocationRepository from "@/repositories/location.repository";

export async function GET() {
    const data = await LocationRepository.getAllPublished();

    return Response.json({ data });
}

export async function POST(request: Request) {
    const body = await request.json();
    // todo: piglia userId da cookies
    const data = await LocationRepository.add({
        ...body,
        userId: "67caec95-0da3-4aa0-953d-e03332c795d5"
    });

    return Response.json({ data });
}
