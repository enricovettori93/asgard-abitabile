import MyAccountLocationDetail from "@/app/account/locations/[id]/_components/detail";
import Link from "next/link";
import {ROUTES} from "@/utils/constants";

const AccountLocationDetailPage = () => {
    return (
        <>
            <div className="mb-5">
                <Link className="font-semibold with-hover-border" href={ROUTES.MY_LOCATIONS}>
                    <i className="fi fi-ts-angle-small-left"></i>&nbsp;<span>Le tue locations</span>
                </Link>
            </div>
            <MyAccountLocationDetail />
        </>
    )
}

export default AccountLocationDetailPage;
