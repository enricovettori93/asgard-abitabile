import {User} from "@prisma/client";

export type AddUserDTO = Omit<User, "id">
