import {EditUserForm} from "@/types/user";
import {useContext, useState} from "react";
import {UserContext} from "@/context/user.context";
import UserService from "@/services/user.service";
import toast from "react-hot-toast";

const useEditAccountDetail = () => {
    const [loading, setLoading] = useState(false);
    const {updateUser} = useContext(UserContext);

    const editAccount = async (payload: EditUserForm) => {
        try {
            setLoading(true);
            const user = await UserService.updateAccount(payload);
            updateUser(user);
            toast.success("Profilo modificato con successo");
        } catch (e: any) {
            toast.error(e.message || "Errore durante la modifica del profilo");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        editAccount
    }
}

export default useEditAccountDetail;
