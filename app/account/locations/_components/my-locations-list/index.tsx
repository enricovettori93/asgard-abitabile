"use client"

import Image from "next/image";
import {useEffect} from "react";
import {LocationWithPictures} from "@/types/location";
import Link from "next/link";
import useMyLocations from "@/app/account/locations/_components/my-locations-list/hooks/useMyLocations";

const Location = ({location}: { location: LocationWithPictures }) => {
    return (
        <li>
            <Link href={`/account/locations/${location.id}`} className="flex w-full">
                <div className="w-1/3">
                    {
                        location.pictures[0] && (
                            <Image unoptimized
                                   src={`/${location.pictures[0]?.src}`}
                                   alt={location.pictures[0]?.alt || ""}
                                   width={location.pictures[0]?.width}
                                   height={location.pictures[0]?.height}
                            />
                        )
                    }
                    {
                        !location.pictures[0] && (<span>Picture not available</span>)
                    }
                </div>
                <div className="w-2/3">
                    <ul>
                        <li><span className="font-bold">Titolo:&nbsp;</span>{location.title}</li>
                        <li><span className="font-bold">Descrizione:&nbsp;</span>{location.description}</li>
                        <li><span className="font-bold">Prezzo per notte:&nbsp;</span>{location.priceForNight}</li>
                        <li><span className="font-bold">Persone per notte:&nbsp;</span>{location.maxAdultsForNight}</li>
                    </ul>
                </div>
            </Link>
        </li>
    )
}

const MyLocationsList = () => {
    const {getMyLocations, locations, loading} = useMyLocations();

    useEffect(() => {
        getMyLocations();
    }, []);

    if (loading) return (<p>Loading...</p>);

    return (
        <ul className="flex flex-col gap-10">
            {locations.map(l => <Location key={l.id} location={l}/>)}
        </ul>
    )
}

export default MyLocationsList;
