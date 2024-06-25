import {Prisma} from '@prisma/client'
import {Location, Reservation} from "@prisma/client";

const locationWithPictures = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true },
})

const locationWithPicturesAndReservationsAndTags = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true, reservations: true, tags: true },
})

const locationWithPicturesAndUser = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true, user: {omit: {password: true}} },
})

const locationWithPicturesAndUserAndTags = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true, tags: true, user: {omit: {password: true}} },
})

const locationWithPicturesAndUserAndReservations = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true, user: {omit: {password: true}}, reservations: true },
})

export type LocationWithPictures = Prisma.LocationGetPayload<typeof locationWithPictures>
export type LocationAvailableWithPictures = LocationWithPictures & {isAvailable: boolean}
export type LocationWithPicturesAndReservationsAndTags = Prisma.LocationGetPayload<typeof locationWithPicturesAndReservationsAndTags>
export type LocationWithPicturesAndUserAndTags = Prisma.LocationGetPayload<typeof locationWithPicturesAndUserAndTags>
export type LocationWithPicturesAndUserAndReservations = Prisma.LocationGetPayload<typeof locationWithPicturesAndUserAndReservations>
export type AddLocation = Omit<Location, "id" | "createdAt" | "updatedAt">
export type AddLocationForm = Omit<AddLocation, "userId" | "createdAt" | "updatedAt" | "description"> & {pictures?: File [], description: any}
export type EditLocationForm = AddLocationForm
export type LocationSearchForm = Pick<Location, "cityName" | "lat" | "lng"> & {
    startDate: string
    endDate: string
    maxAdultsForNight?: number
    priceForNight?: number
}
export type LocationReserveForm = Pick<Reservation, "startDate" | "endDate" | "adultsForNight">

