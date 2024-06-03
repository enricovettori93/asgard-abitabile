import PictureRepository from "@/repositories/picture.repository";
import {Location, Picture} from "@prisma/client";
import LocationRepository from "@/repositories/location.repository";
import {getUserIdFromRequest} from "@/utils/session";
import {NextResponse} from "next/server";
import {ResponseDTO} from "@/types/common";
import {removeImageFromFileSystem} from "@/utils/fs";
import NotAllowed from "@/errors/not-allowed";

interface Params {
    params: { id: Location["id"], picture: Picture["id"] }
}

export async function DELETE(request: Request, { params }: Params) {
    const userId = await getUserIdFromRequest();
    const {id, picture} = params;

    try {
        const location = await LocationRepository.get(id);
        if (location.userId !== userId) {
            throw new NotAllowed();
        }
        const p = await PictureRepository.get(picture);
        await removeImageFromFileSystem(p.src);
        await PictureRepository.delete(picture);
        return NextResponse.json({
            message: "Image deleted",
        } satisfies ResponseDTO<never>);
    } catch (e: any) {
        return NextResponse.json({
            message: e.message || "Server error"
        } satisfies ResponseDTO<never>, {
            status: e.statusCode || 500
        });
    }
}
