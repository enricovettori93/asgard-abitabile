import React from 'react';
import Link from "next/link";
import ColumnSeparator from '@/components/column-separator';
import {ROUTES} from "@/utils/constants";
import {usePathname, useRouter} from "next/navigation";

const AccountDetailTabChooser = () => {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return (
        <div className="flex gap-5">
            <Link className={`${isActive(ROUTES.MY_ACCOUNT) ? "font-bold active" : ""} text-2xl with-hover-border`} href={ROUTES.MY_ACCOUNT}>
                Il mio account
            </Link>
            <ColumnSeparator />
            <Link className={`${isActive(ROUTES.MY_LOCATIONS) ? "font-bold active" : ""} text-2xl with-hover-border`} href={ROUTES.MY_LOCATIONS}>
                Le mie locations
            </Link>
        </div>
    );
};

export default AccountDetailTabChooser;
