import {useState} from "react";
import {AddUserForm} from "@/types/user";
import userService from "@/services/user.service";

const useSignUp = () => {
    const [loading, setLoading] = useState(false);

    const signUp = async (payload: AddUserForm) => {
        setLoading(true);
        const user = await userService.signUp(payload);
        setLoading(false);
    }

    return {
        loading,
        signUp
    }
}

export default useSignUp;
