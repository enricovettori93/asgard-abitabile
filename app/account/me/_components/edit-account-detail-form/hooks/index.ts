import {EditUserForm} from "@/types/user";
import {useContext, useState} from "react";
import {UserContext} from "@/context/user.context";
import UserService from "@/services/user.service";

const useEditAccountDetail = () => {
    const [loading, setLoading] = useState(false);
    const {updateUser} = useContext(UserContext);

    const editAccount = async (payload: EditUserForm) => {
        try {
            setLoading(true);
            const user = await UserService.updateAccount(payload);
            updateUser(user);
        } catch (e) {
            // todo: toast
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
