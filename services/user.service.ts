import {AddUserForm, EditUserForm, EditUserPasswordForm, SafeUser, UserSignInForm} from "@/types/user";
import betterFetch from "@/utils/fetch";

interface UserServiceInterface {
    signUp(payload: AddUserForm): Promise<void>
    me(): Promise<SafeUser>
    signIn(payload: AddUserForm): Promise<SafeUser>
    logout(): Promise<void>
    updateAccount(payload: EditUserForm): Promise<SafeUser>
    updatePassword(payload: EditUserPasswordForm): Promise<void>
}

class UserService implements UserServiceInterface {
    async signUp(payload: AddUserForm): Promise<void> {
        return (await betterFetch<never>("auth/signup", {
            method: "POST",
            body: JSON.stringify(payload)
        })) as unknown as void;
    }

    async signIn(payload: UserSignInForm): Promise<SafeUser> {
        return (await betterFetch<SafeUser>("auth/signin", {
            method: "POST",
            body: JSON.stringify(payload)
        })).data as SafeUser;
    }

    async logout(): Promise<void> {
        return await betterFetch<void>("auth/logout") as unknown as void;
    }

    async me(): Promise<SafeUser> {
        return (await betterFetch<SafeUser>("users/me")).data as SafeUser;
    }

    async updateAccount(payload: EditUserForm): Promise<SafeUser> {
        return (await betterFetch<SafeUser>("users/me", {
            method: "PATCH",
            body: JSON.stringify(payload)
        })).data as SafeUser;
    }

    async updatePassword(payload: EditUserPasswordForm): Promise<void> {
        return (await betterFetch<never>("users/me/password", {
            method: "PATCH",
            body: JSON.stringify(payload)
        })) as unknown as void;
    }
}

export default new UserService();
