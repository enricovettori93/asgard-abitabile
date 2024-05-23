import {Prisma, Reservation} from "@prisma/client";

const reservationWithUser = Prisma.validator<Prisma.ReservationDefaultArgs>()({
    include: {user: {omit: {password: true}}}
})

const reservationWithLocation = Prisma.validator<Prisma.ReservationDefaultArgs>()({
    include: {location: true}
})

export type ReservationWithUser = Prisma.ReservationGetPayload<typeof reservationWithUser>
export type ReservationWithLocation = Prisma.ReservationGetPayload<typeof reservationWithLocation>
export type AddReservation = Omit<Reservation, "id" | "createdAt" | "updatedAt">
