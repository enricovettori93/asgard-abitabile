import {User} from "@prisma/client";

export type AddUserForm = Omit<User, "id" | "createdAt" | "updatedAt">

export type SafeUser = Omit<User, "password">
