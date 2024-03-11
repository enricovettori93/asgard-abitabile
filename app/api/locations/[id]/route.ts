import LocationRepository from "@/repositories/location.repository";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const data = await LocationRepository.get(id);

    if (!data) {
        return new Response("Location not found", {
            status: 404,
        });
    }

    return Response.json({ data });
}

export async function DELETE(request: Request, { params }: { params: { id: string }}) {
    const { id } = params;

    await LocationRepository.delete(id);

    return new Response("Location deleted", {
        status: 200
    });
}
