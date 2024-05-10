import React from "react";

import AccountDetailTabChooser from "@/app/account/_components/account-detail-tab-chooser";

const AccountLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <section className="w-full p-5">
            <AccountDetailTabChooser />
            {children}
        </section>
    )
}

export default AccountLayout;
