import {AddUserForm, SafeUser} from "@/types/user";
import betterFetch from "@/utils/fetch";

interface UserServiceInterface {
    signUp(payload: AddUserForm): Promise<SafeUser>
}

class UserService implements UserServiceInterface {
    async signUp(payload: AddUserForm): Promise<SafeUser> {
        return (await betterFetch("auth/signup", {
            method: "POST",
            body: JSON.stringify(payload)
        })).data as SafeUser;
    }
}

export default new UserService();
