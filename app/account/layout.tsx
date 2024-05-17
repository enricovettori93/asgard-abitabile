"use client"

import React, {useContext} from "react";

import AccountDetailTabChooser from "@/app/account/_components/account-detail-tab-chooser";
import {UserContext} from "@/context/user.context";

const AccountLayout = ({children}: {children: React.ReactNode}) => {
    const {ready} = useContext(UserContext);

    if (!ready) {
        return (<p>Loading user details...</p>)
    }

    return (
        <section className="w-full p-5">
            {ready && (
                <>
                    <AccountDetailTabChooser />
                    {children}
                </>
            )}
        </section>
    )
}

export default AccountLayout;
