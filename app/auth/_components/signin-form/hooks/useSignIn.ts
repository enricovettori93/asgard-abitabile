import {useContext, useState} from "react";
import {UserSignInForm} from "@/types/user";
import userService from "@/services/user.service";
import {UserContext} from "@/context/user.context";
import {useRouter, useSearchParams} from "next/navigation";
import toast from "react-hot-toast";
import {ValidationErrors} from "@/types/common";

const useSignIn = () => {
    const {login} = useContext(UserContext);
    const queryParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const parseUrlWithQueryParams = () => {
        const params = queryParams.get("returnUrl")!;
        const split = params.split("/");
        const last = split.pop();
        return split.join("/").concat("?").concat(`${last}`);
    }

    const signIn = async (payload: UserSignInForm) => {
        try {
            setLoading(true);
            const user = await userService.signIn(payload);
            login(user);
            if (queryParams.get("returnUrl")) {
                router.push(parseUrlWithQueryParams());
            } else {
                router.push("/");
            }
        } catch (e: any) {
            setErrors(e.cause);
            toast.error(e.message || "Errore durante l'autenticazione");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        errors,
        signIn
    }
}

export default useSignIn;
