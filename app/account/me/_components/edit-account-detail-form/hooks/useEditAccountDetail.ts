import {useContext} from "react";
import {UserContext} from "@/context/user.context";
import UserService from "@/services/user.service";
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";

const useEditAccountDetail = () => {
    const {updateUser} = useContext(UserContext);
    const {isPending, mutate: editAccount} = useMutation({
        mutationFn: UserService.updateAccount,
        onSuccess: (user) => {
            updateUser(user);
            toast.success("Profilo modificato con successo");
        },
        onError: (e: any) => {
            toast.error(e.message || "Errore durante la modifica del profilo");
        }
    });

    return {
        isPending,
        editAccount
    }
}

export default useEditAccountDetail;
