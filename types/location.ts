import {Prisma} from '@prisma/client'
import {Location} from "@prisma/client";

const locationWithPictures = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true },
})

const locationWithPicturesAndUser = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true, user: true },
})

export type LocationWithPictures = Prisma.LocationGetPayload<typeof locationWithPictures>
export type LocationWithPicturesAndUser = Prisma.LocationGetPayload<typeof locationWithPicturesAndUser>
export type AddLocation = Omit<Location, "id">
export type AddLocationForm = Omit<AddLocation, "userId"> & {pictures?: File []}
export type EditLocationForm = AddLocationForm
export interface LocationSearchForm {
    city: string
    from: string
    to: string
    maxAdultsForNight?: number
    priceForNight?: number
}
