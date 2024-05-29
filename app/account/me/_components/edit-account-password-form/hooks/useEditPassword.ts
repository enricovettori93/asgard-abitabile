import {useState} from "react";
import {EditUserPasswordForm} from "@/types/user";
import UserService from "@/services/user.service";
import toast from "react-hot-toast";

const useEditPassword = () => {
    const [loading, setLoading] = useState(false);

    const editPassword = async (payload: EditUserPasswordForm) => {
        try {
            setLoading(true);
            await UserService.updatePassword(payload);
            toast.success("Password modificata con successo");
        } catch (e: any) {
            toast.error(e.message || "Errore durante la modifica della password");
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
