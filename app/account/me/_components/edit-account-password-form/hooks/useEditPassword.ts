import {useState} from "react";
import {EditUserPasswordForm} from "@/types/user";
import UserService from "@/services/user.service";

const useEditPassword = () => {
    const [loading, setLoading] = useState(false);

    const editPassword = async (payload: EditUserPasswordForm) => {
        try {
            setLoading(true);
            await UserService.updatePassword(payload);
        } catch (e) {
            // todo: toast
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        editPassword
    }
}

export default useEditPassword;
