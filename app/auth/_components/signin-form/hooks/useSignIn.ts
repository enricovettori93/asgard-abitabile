import {useContext, useState} from "react";
import userService from "@/services/user.service";
import {UserContext} from "@/context/user.context";
import {useRouter, useSearchParams} from "next/navigation";
import toast from "react-hot-toast";
import {ValidationErrors} from "@/types/common";
import {useMutation} from "@tanstack/react-query";

const useSignIn = () => {
    const {login} = useContext(UserContext);
    const queryParams = useSearchParams();
    const router = useRouter();
    const [errors, setErrors] = useState<ValidationErrors>({});
    const {isPending, mutate: signIn} = useMutation({
        mutationFn: userService.signIn,
        onSuccess: (user) => {
            login(user);
            if (queryParams.get("returnUrl")) {
                router.push(parseUrlWithQueryParams());
            } else {
                router.push("/");
            }
        },
        onError: (e: any) => {
            setErrors(e.cause);
            toast.error(e.message || "Errore durante l'autenticazione");
        }
    });

    const parseUrlWithQueryParams = () => {
        const params = queryParams.get("returnUrl")!;
        const split = params.split("/");
        const last = split.pop();
        return split.join("/").concat("?").concat(`${last}`);
    }

    return {
        isPending,
        errors,
        signIn
    }
}

export default useSignIn;
