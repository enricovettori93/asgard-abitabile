import {User} from "@prisma/client";

export type UserSignInForm = Pick<User, "email" | "password">

export type AddUserForm = Omit<User, "id" | "createdAt" | "updatedAt">

export type SafeUser = Omit<User, "password">
