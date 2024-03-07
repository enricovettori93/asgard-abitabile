import LocationService from "@/services/location.service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id;

    if (!id) {
        throw new Error("Cannot find the location");
    }

    const data = await LocationService.get(id);

    if (!data) {
        throw new Error("Cannot find the location");
    }

    return Response.json({ data });
}
