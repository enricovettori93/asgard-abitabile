import React from 'react';
import Link from "next/link";
import ColumnSeparator from '@/components/column-separator';
import {ROUTES} from "@/utils/constants";

const AccountDetailTabChooser = () => {
    return (
        <div className="flex gap-5">
            <Link className="text-3xl" href={ROUTES.MY_ACCOUNT}>
                Il mio account
            </Link>
            <ColumnSeparator />
            <Link className="text-3xl" href={ROUTES.MY_LOCATIONS}>
                Le mie locations
            </Link>
        </div>
    );
};

export default AccountDetailTabChooser;
