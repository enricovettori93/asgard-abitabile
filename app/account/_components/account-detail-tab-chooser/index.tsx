import React from 'react';
import Link from "next/link";

const AccountDetailTabChooser = () => {
    return (
        <div className="flex gap-5">
            <Link href="/account/me">
                My account
            </Link>
            <Link href="/account/locations">
                My locations
            </Link>
        </div>
    );
};

export default AccountDetailTabChooser;
