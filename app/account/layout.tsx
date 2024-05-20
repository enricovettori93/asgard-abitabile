"use client"

import React, {useContext} from "react";

import AccountDetailTabChooser from "@/app/account/_components/account-detail-tab-chooser";
import {UserContext} from "@/context/user.context";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/utils/constants";

const AccountLayout = ({children}: {children: React.ReactNode}) => {
    const router = useRouter();
    const {ready, user} = useContext(UserContext);

    if (!ready) {
        return (<p>Loading...</p>)
    }

    if (ready && !user) {
        router.push(ROUTES.AUTH);
    } else {
        return (
            <section className="w-full p-5">
                {ready && (
                    <>
                        <AccountDetailTabChooser />
                        <div className="mt-10">
                            {children}
                        </div>
                    </>
                )}
            </section>
        )
    }
}

export default AccountLayout;
