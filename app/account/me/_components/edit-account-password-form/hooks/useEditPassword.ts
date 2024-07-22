import UserService from "@/services/user.service";
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";

const useEditPassword = () => {
    const {isPending, mutate: editPassword} = useMutation({
        mutationFn: UserService.updatePassword,
        onError: (e: any) => {
            toast.error(e.message || "Errore durante la modifica della password");
        },
        onSuccess: () => {
            toast.success("Password modificata con successo");
        }
    });

    return {
        isPending,
        editPassword
    }
}

export default useEditPassword;
