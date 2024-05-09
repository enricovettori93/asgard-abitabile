"use client"

import {SafeUser} from "@/types/user";
import React, {createContext, useEffect, useMemo, useState} from "react";
import UserService from "@/services/user.service";
import {getCookie} from "@/utils/cookie";

interface UserContextInterface {
    user: SafeUser | null
    isLogged: boolean
    loading: boolean
    login: (user: SafeUser) => void
    logout: () => void
}

interface UserContextProps {
    children: React.ReactNode
}

const initialValues: UserContextInterface = {
    user: null,
    isLogged: false,
    loading: false,
    login: () => {
    },
    logout: () => {
    }
}

export const UserContext = createContext(initialValues);

export default function UserContextProvider({children}: UserContextProps) {
    const [user, setUser] = useState<SafeUser | null>(null);
    const [loading, setLoading] = useState(false);

    const isLogged = useMemo(() => !!user, [user]);

    const fetchCurrentUserInfo = async () => {
        try {
            setLoading(true);
            const user = await UserService.me();
            setUser(user);
        } catch (e) {
            // todo: toast
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        setUser(null);
    }

    const login = (user: SafeUser) => {
        setUser(user);
    }

    useEffect(() => {
        if (getCookie("userId")) {
            fetchCurrentUserInfo();
        }
    }, []);

    return (
        <UserContext.Provider value={{user, login, logout, isLogged, loading}}>
            {children}
        </UserContext.Provider>
    )
}
