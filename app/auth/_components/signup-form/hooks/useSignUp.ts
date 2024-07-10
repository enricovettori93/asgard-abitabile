import {useState} from "react";
import userService from "@/services/user.service";
import {ValidationErrors} from "@/types/common";
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";

interface props {
    handleSignUpFlow: Function
}

const useSignUp = ({handleSignUpFlow}: props) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const {isPending, mutate: signUp} = useMutation({
        mutationFn: userService.signUp,
        onSuccess: () => {
            toast.success("Registrazione completata con successo");
            handleSignUpFlow();
        },
        onError: (e: any) => {
            setErrors(e.cause);
            toast.error(e.message || "Errore durante la registrazione");
        }
    });

    return {
        isPending,
        errors,
        signUp
    }
}

export default useSignUp;
