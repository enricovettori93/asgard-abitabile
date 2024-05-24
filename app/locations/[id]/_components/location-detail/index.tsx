"use client"

import {Location} from "@prisma/client";
import {useRouter} from "next/navigation";
import LocationReserveForm from "@/app/locations/[id]/_components/location-reserve-form";
import {useContext} from "react";
import {UserContext} from "@/context/user.context";
import useQuillConvertDeltaToHtml from "@/hooks/useQuillConvertDeltaToHtml";

interface Props {
    location: Location
}

export function LocationDetail({ location }: Props) {
    const router = useRouter();
    const {isLogged, ready} = useContext(UserContext);
    const {html} = useQuillConvertDeltaToHtml(JSON.parse(`${location.description}`));

    return (
        <>
            <button type="button" onClick={() => router.back()}>Back</button>
            {!isLogged && ready && <p>Entra con il tuo account per prentare questa struttura!</p>}
            {isLogged && ready && <LocationReserveForm location={location}/>}
            <div className="location__description">
                <div dangerouslySetInnerHTML={{__html: html}}></div>
            </div>
            <div>
                {JSON.stringify(location)}
            </div>
        </>
    )
}
