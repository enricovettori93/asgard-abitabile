import {writeFile, mkdir} from "node:fs/promises";
import path from "node:path";
import {Location} from "@prisma/client";
import {existsSync} from "node:fs";

interface res {
    fullPath: string
    relativePath: string
}

export const writeImageToFileSystem = async (locationId: Location["id"], file: File): Promise<res> => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

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

