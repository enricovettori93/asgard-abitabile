import LocationRepository from "@/repositories/location.repository";

export async function GET() {
    const data = await LocationRepository.getAll();

    return Response.json({ data });
}

export async function POST(request: Request) {
    const body = await request.json();
    const data = await LocationRepository.add(body);

    return Response.json({ data });
}
