import {AddUserForm, SafeUser} from "@/types/user";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

interface RepositoryInterface {
    find(email: string): Promise<SafeUser | null>
    // login(payload: User): Promise<boolean>
    // logout(): Promise<void>
    register(payload: AddUserForm): Promise<SafeUser>
    // delete(email: string): Promise<void>
    // update(payload: User): Promise<void>
}

class UserRepository implements RepositoryInterface {
    async register(payload: AddUserForm): Promise<SafeUser> {
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        const {password, ...rest} = await prisma.user.create({data: {...payload, password: hashedPassword}});

        return rest;
    }

    async find(email: string): Promise<SafeUser | null> {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    }
}

export default new UserRepository();
