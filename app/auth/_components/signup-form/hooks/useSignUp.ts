import {useState} from "react";
import {AddUserForm} from "@/types/user";
import userService from "@/services/user.service";
import {ValidationErrors} from "@/types/common";
import toast from "react-hot-toast";

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const signUp = async (payload: AddUserForm) => {
        try {
            setLoading(true);
            await userService.signUp(payload);
        } catch (e: any) {
            setErrors(e.cause);
            toast.error(e.message || "Errore durante la registrazione");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        errors,
        signUp
    }
}

export default useSignUp;
