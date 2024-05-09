import {AddUserForm, SafeUser, UserSignInForm} from "@/types/user";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import UserAdapter from "@/adapters/user";
import {User} from "@prisma/client";

interface RepositoryInterface {
    findByEmail(email: User["email"]): Promise<SafeUser | null>
    findById(id: User["id"]): Promise<SafeUser | null>
    login(payload: UserSignInForm): Promise<SafeUser | null>
    register(payload: AddUserForm): Promise<SafeUser>
    // delete(email: string): Promise<void>
    // update(payload: User): Promise<void>
}

class UserRepository implements RepositoryInterface {
    async register(payload: AddUserForm): Promise<SafeUser> {
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        const user = await prisma.user.create({data: {...payload, password: hashedPassword}});

        return UserAdapter.fromUserToSafeUser(user);
    }

    async findByEmail(email: User["email"]): Promise<SafeUser | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) return null;

        return UserAdapter.fromUserToSafeUser(user);
    }

    async findById(id: User["id"]): Promise<SafeUser | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) return null;

        return UserAdapter.fromUserToSafeUser(user);
    }

    async login(payload: UserSignInForm): Promise<SafeUser> {
        const {email, password} = payload;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) throw new Error("Wrong credential");

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) throw new Error("Wrong credential");

        return UserAdapter.fromUserToSafeUser(user);
    }
}

export default new UserRepository();
