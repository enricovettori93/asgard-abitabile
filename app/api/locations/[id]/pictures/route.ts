import LocationRepository from "@/repositories/location.repository";
import PictureRepository from "@/repositories/picture.repository";
import {writeImageToFileSystem} from "@/utils/fs";
import sharp from "sharp";

interface Params {
    params: { id: string }
}

export async function PUT(request: Request, { params }: Params) {
    const { id } = params;
    const formData = await request.formData();
    const location = await LocationRepository.get(id);

    if (!location) {
        return new Response("Location not found", {
            status: 404,
        });
    }

    for(let [fileName, file] of formData.entries()) {
        const {fullPath, relativePath} = await writeImageToFileSystem(location.id, file as File);
        const {width, height} = await sharp(fullPath).metadata();

        await PictureRepository.add(id, {
            alt: fileName,
            src: relativePath,
            height: width as number,
            width: height as number
        });
    }

    return Response.json(await LocationRepository.get(id));
}
