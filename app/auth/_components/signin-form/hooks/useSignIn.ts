import {useContext, useState} from "react";
import {UserSignInForm} from "@/types/user";
import userService from "@/services/user.service";
import {UserContext} from "@/context/user.context";
import {useRouter} from "next/navigation";

const useSignIn = () => {
    const {login} = useContext(UserContext);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const signIn = async (payload: UserSignInForm) => {
        try {
            setLoading(true);
            const user = await userService.signIn(payload);
            login(user);
            router.push("/");
        } catch (e) {
            // todo: toast
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        signIn
    }
}

export default useSignIn;
