import { Prisma } from '@prisma/client'
import {Location} from "@prisma/client";

const LocationWithPictures = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true },
})

const LocationWithPicturesAndUser = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true, user: true },
})

// fixme: sti cosi non vanno
export type LocationWithPictures = Prisma.LocationGetPayload<typeof LocationWithPictures>
export type LocationWithPicturesAndUser = Prisma.LocationGetPayload<typeof LocationWithPicturesAndUser>
export type AddLocation = Omit<Location, "id">
