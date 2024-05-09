import {User} from "@prisma/client";
import {SafeUser} from "@/types/user";

export default class UserAdapter {
    static fromUserToSafeUser(user: User): SafeUser {
        const {password, ...rest} = user;
        return rest;
    }
}
