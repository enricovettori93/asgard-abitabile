import {AddUserForm, SafeUser, UserSignInForm} from "@/types/user";
import betterFetch from "@/utils/fetch";

interface UserServiceInterface {
    signUp(payload: AddUserForm): Promise<void>
    me(): Promise<SafeUser>
    signIn(payload: AddUserForm): Promise<SafeUser>
    logout(): Promise<void>
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
}

export default new UserService();
