import LocationService from "@/services/location.service";

export async function GET() {
    const data = await LocationService.getAll();

    return Response.json({ data });
}
