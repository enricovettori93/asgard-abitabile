import {Prisma} from '@prisma/client'
import {Location, Reservation} from "@prisma/client";

const locationWithPictures = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true },
})

const locationWithPicturesAndReservations = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true, reservations: true },
})

const locationWithPicturesAndUser = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true, user: true },
})

const locationWithPicturesAndUserAndReservations = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: { pictures: true, user: true, reservations: true },
})

const reservationWithUser = Prisma.validator<Prisma.ReservationDefaultArgs>()({
    include: { user: true }
})

export type LocationWithPictures = Prisma.LocationGetPayload<typeof locationWithPictures>
export type LocationAvailableWithPictures = LocationWithPictures & {isAvailable: boolean}
export type ReservationWithUser = Prisma.ReservationGetPayload<typeof reservationWithUser>
export type LocationWithPicturesAndReservations = Prisma.LocationGetPayload<typeof locationWithPicturesAndReservations>
export type LocationWithPicturesAndUser = Prisma.LocationGetPayload<typeof locationWithPicturesAndUser>
export type LocationWithPicturesAndUserAndReservations = Prisma.LocationGetPayload<typeof locationWithPicturesAndUserAndReservations>
export type AddLocation = Omit<Location, "id" | "createdAt" | "updatedAt">
export type AddLocationForm = Omit<AddLocation, "userId" | "createdAt" | "updatedAt"> & {pictures?: File []}
export type EditLocationForm = AddLocationForm
export interface LocationSearchForm {
    city: string
    startDate: string
    endDate: string
    maxAdultsForNight?: number
    priceForNight?: number
}
export type LocationReserveForm = Pick<Reservation, "startDate" | "endDate" | "adultsForNight">
export type AddReservation = Omit<Reservation, "id" | "createdAt" | "updatedAt">
