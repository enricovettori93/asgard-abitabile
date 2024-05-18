import LocationRepository from "@/repositories/location.repository";
import PictureRepository from "@/repositories/picture.repository";
import {writeImageBufferToFileSystem} from "@/utils/fs";
import sharp from "sharp";
import {NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";
import {LocationWithPicturesAndUser} from "@/types/location";
import path from "node:path";
import * as fs from "node:fs";
import {Location} from "@prisma/client";
import {getUserIdFromRequest} from "@/utils/session";
import NotAllowed from "@/errors/not-allowed";

interface Params {
    params: { id: Location["id"] }
}

export async function PUT(request: Request, { params }: Params) {
    const { id } = params;
    const formData = await request.formData();
    const userId = await getUserIdFromRequest();

    try {
        const location = await LocationRepository.get(id);

        if (location.userId !== userId) {
            throw new NotAllowed();
        }

        for(let [fileName, file] of formData.entries()) {
            const webpFileName = `${path.parse(fileName).name}__.webp`;
            const originalBuffer = Buffer.from(await (file as File).arrayBuffer());
            const {fullPath: fullPathOriginal} = await writeImageBufferToFileSystem(location.id, originalBuffer, fileName);
            const webpBuffer = await sharp(fullPathOriginal).webp({quality: 50}).toBuffer();
            const {fullPath: fullPathWebp, relativePath} = await writeImageBufferToFileSystem(location.id, webpBuffer, webpFileName);
            const {width, height} = await sharp(fullPathWebp).metadata();

            fs.rmSync(fullPathOriginal);

            await PictureRepository.add(id, {
                alt: webpFileName,
                src: relativePath,
                height: width as number,
                width: height as number
            });
        }

        const data = await LocationRepository.get(id) as LocationWithPicturesAndUser;

        return NextResponse.json({
            data
        } satisfies ResponseDTO<LocationWithPicturesAndUser>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
