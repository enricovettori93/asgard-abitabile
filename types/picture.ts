import {Picture} from "@prisma/client";

export type AddPicture = Omit<Picture, "id" | "locationId">
