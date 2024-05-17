"use client"

import {SafeUser} from "@/types/user";
import React, {createContext, useEffect, useMemo, useState} from "react";
import UserService from "@/services/user.service";
import {getCookie} from "@/utils/cookie";

interface UserContextInterface {
    user: SafeUser | null
    isLogged: boolean
    loading: boolean
    ready: boolean
    login: (user: SafeUser) => void
    logout: () => void
    updateUser: (user: SafeUser) => void
}

interface UserContextProps {
    children: React.ReactNode
}

const initialValues: UserContextInterface = {
    user: null,
    isLogged: false,
    loading: false,
    ready: false,
    login: () => {
    },
    updateUser: () => {
    },
    logout: () => {
    }
}

export const UserContext = createContext(initialValues);

export default function UserContextProvider({children}: UserContextProps) {
    const [user, setUser] = useState<SafeUser | null>(null);
    const [ready, setReady] = useState(false);
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
            setReady(true);
            setLoading(false);
        }
    }

    const logout = () => {
        setUser(null);
    }

    const login = (user: SafeUser) => {
        setUser(user);
    }

    const updateUser = (user: SafeUser) => {
        setUser(user);
    }

    useEffect(() => {
        if (getCookie("userId")) {
            fetchCurrentUserInfo();
        } else {
            setReady(true);
        }
    }, []);

    return (
        <UserContext.Provider value={{user, login, logout, updateUser, isLogged, loading, ready}}>
            {children}
        </UserContext.Provider>
    )
}
