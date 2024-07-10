import {useContext} from "react";
import userService from "@/services/user.service";
import {useRouter} from "next/navigation";
import {UserContext} from "@/context/user.context";
import {useMutation} from "@tanstack/react-query";

const useLogout = () => {
    const router = useRouter();
    const {logout: logoutFromContext} = useContext(UserContext);
    const {isPending, mutate: logout} = useMutation({
        mutationFn: userService.logout,
        onSuccess: () => {
            logoutFromContext();
            router.push("/");
        }
    });

    return {
        isPending,
        logout
    }
}

export default useLogout;
