import {writeFile, mkdir, rm} from "node:fs/promises";
import path from "node:path";
import {Location} from "@prisma/client";
import {existsSync} from "node:fs";

interface res {
    fullPath: string
    relativePath: string
}

export const writeImageBufferToFileSystem = async (locationId: Location["id"], buffer: Buffer, fileName: string): Promise<res> => {
    const filename = Date.now() + "_" + fileName.replaceAll(" ", "_");

    try {
        const uploadPath = path.join("uploads/" + locationId);
        const folderPath = path.join("public/" + uploadPath);

        if (!existsSync(folderPath)) {
            await mkdir(folderPath);
        }

        const fullPath = path.join(folderPath + "/" + filename);

        await writeFile(
            fullPath,
            buffer
        );

        return  {
            fullPath,
            relativePath: path.join("uploads/" + locationId + "/" + filename)
        }
    } catch (e) {
        console.error("Error writing image to file system", e);
        throw e;
    }
}

export const removeImageFromFileSystem = async (uploadPath: string) => {
    try {
        await rm(path.join("public/" + uploadPath));
    } catch (e) {
        console.error("Error deleting image from file system", e);
        throw e;
    }
}
