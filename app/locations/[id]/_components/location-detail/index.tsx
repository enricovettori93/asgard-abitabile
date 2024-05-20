"use client"

import {Location} from "@prisma/client";
import {useRouter} from "next/navigation";
import LocationReserveForm from "@/app/locations/[id]/_components/location-reserve-form";
import {useContext} from "react";
import {UserContext} from "@/context/user.context";

interface Props {
    location: Location
}

export function LocationDetail({ location }: Props) {
    const router = useRouter();
    const {isLogged, ready} = useContext(UserContext);

    return (
        <>
            <button type="button" onClick={() => router.back()}>Back</button>
            {!isLogged && ready && <p>Entra con il tuo account per prentare questa struttura!</p>}
            {isLogged && ready && <LocationReserveForm location={location}/>}
            <div>
                {JSON.stringify(location)}
            </div>
        </>
    )
}
