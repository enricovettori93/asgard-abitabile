import {AddUserForm, EditUserForm, EditUserPasswordForm, SafeUser, UserSignInForm} from "@/types/user";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import UserAdapter from "@/adapters/user";
import {User} from "@prisma/client";
import NotFound from "@/errors/not-found";
import WrongCredential from "@/errors/wrong-credential";

interface RepositoryInterface {
    findByEmail(email: User["email"]): Promise<SafeUser | null>
    findById(id: User["id"]): Promise<SafeUser | null>
    login(payload: UserSignInForm): Promise<SafeUser | null>
    register(payload: AddUserForm): Promise<SafeUser>
    // delete(email: string): Promise<void>
    update(id: User["id"], payload: EditUserForm): Promise<SafeUser>
    updatePassword(id: User["id"], payload: EditUserPasswordForm): Promise<void>
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

        if (!user) throw new NotFound();

        return UserAdapter.fromUserToSafeUser(user);
    }

    async findById(id: User["id"]): Promise<SafeUser | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) throw new NotFound();

        return UserAdapter.fromUserToSafeUser(user);
    }

    async login(payload: UserSignInForm): Promise<SafeUser> {
        const {email, password} = payload;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) throw new NotFound();

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) throw new WrongCredential();

        return UserAdapter.fromUserToSafeUser(user);
    }

    async update(id: User["id"], payload: EditUserForm): Promise<SafeUser> {
        const userDB = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!userDB) throw new NotFound();

        const user = await prisma.user.update({
            where: {
                id
            },
            data: {...payload}
        });

        return UserAdapter.fromUserToSafeUser(user);
    }

    async updatePassword(id: User["id"], payload: EditUserPasswordForm): Promise<void> {
        const userDB = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!userDB) throw new NotFound();

        const correctPassword = await bcrypt.compare(payload.password, userDB.password);

        if (!correctPassword) throw new WrongCredential();

        const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

        await prisma.user.update({
            where: {
                id
            },
            data: {password: hashedPassword}
        });

        return;
    }
}

export default new UserRepository();
