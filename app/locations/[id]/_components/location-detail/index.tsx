"use client"

import {Location} from "@prisma/client";
import {useRouter} from "next/navigation";

interface Props {
    location: Location
}

export function LocationDetail({ location }: Props) {
    const router = useRouter();

    return (
        <>
            <button type="button" onClick={() => router.back()}>Back</button>
            <div>
                {JSON.stringify(location)}
            </div>
        </>
    )
}
