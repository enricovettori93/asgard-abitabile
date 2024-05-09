import {useContext, useState} from "react";
import {UserSignInForm} from "@/types/user";
import userService from "@/services/user.service";
import {UserContext} from "@/context/user.context";

const useSignIn = () => {
    const {login} = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const signIn = async (payload: UserSignInForm) => {
        setLoading(true);
        const user = await userService.signIn(payload);
        login(user);
        setLoading(false);
    }

    return {
        loading,
        signIn
    }
}

export default useSignIn;
