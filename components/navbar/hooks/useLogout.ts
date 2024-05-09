import {useContext, useState} from "react";
import userService from "@/services/user.service";
import {useRouter} from "next/navigation";
import {UserContext} from "@/context/user.context";

const useLogout = () => {
    const router = useRouter();
    const {logout: logoutFromContext} = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setLoading(true);
        await userService.logout();
        logoutFromContext();
        setLoading(false);
        router.push("/");
    }

    return {
        loading,
        logout
    }
}

export default useLogout;
