import {Picture} from "@prisma/client";

export type AddPictureDto = Omit<Picture, "id">
