import {User} from "@prisma/client";

export type UserSignInForm = Pick<User, "email" | "password">

export type AddUserForm = Omit<User, "id" | "createdAt" | "updatedAt">

export type EditUserForm = Pick<User, "name" | "surname">

export type EditUserPasswordForm = Pick<User, "password"> & {newPassword: string, repeatNewPassword: string}

export type SafeUser = Omit<User, "password">
