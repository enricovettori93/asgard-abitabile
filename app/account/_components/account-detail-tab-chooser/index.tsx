import React from 'react';
import Link from "next/link";
import ColumnSeparator from '@/components/column-separator';
import {ROUTES} from "@/utils/constants";
import {usePathname} from "next/navigation";

const AccountDetailTabChooser = () => {
    const pathname = usePathname();

    const isActive = (href: string) => pathname.includes(href);

    return (
        <div className="flex gap-5 max-w-full overflow-x-auto">
            <Link className={`${isActive(ROUTES.MY_ACCOUNT) ? "font-bold active" : ""} md:text-2xl with-hover-border`} href={ROUTES.MY_ACCOUNT}>
                Il mio account
            </Link>
            <ColumnSeparator />
            <Link className={`${isActive(ROUTES.MY_LOCATIONS) ? "font-bold active" : ""} md:text-2xl with-hover-border`} href={ROUTES.MY_LOCATIONS}>
                Le mie locations
            </Link>
            <ColumnSeparator />
            <Link className={`${isActive(ROUTES.MY_RESERVATIONS) ? "font-bold active" : ""} md:text-2xl with-hover-border`} href={ROUTES.MY_RESERVATIONS}>
                Le mie prenotazioni
            </Link>
        </div>
    );
};

export default AccountDetailTabChooser;
