"use client"

import Image from "next/image";
import {useEffect} from "react";
import {LocationWithPictures} from "@/types/location";
import Link from "next/link";
import useMyLocations from "@/app/account/locations/_components/my-locations-list/hooks/useMyLocations";
import {ROUTES} from "@/utils/constants";
import Card from "@/components/card";
import ListLoader from "@/components/skeleton-loaders/list-loader";

const Location = ({location}: { location: LocationWithPictures }) => {
    return (
        <Link href={`${ROUTES.MY_LOCATIONS}/${location.id}`} className="h-[25em] sm:h-[20em] md:h-[15em]">
            <Card className="flex flex-col md:flex-row gap-5 w-full h-full">
                <div className="w-full md:w-1/3 h-1/2 md:h-full">
                    {
                        location.pictures[0] && (
                            <Image unoptimized
                                   src={`/${location.pictures[0]?.src}`}
                                   alt={location.pictures[0]?.alt || ""}
                                   width={location.pictures[0]?.width}
                                   height={location.pictures[0]?.height}
                                   className="h-full object-cover rounded-xl"
                            />
                        )
                    }
                    {
                        !location.pictures[0] && (<span>Picture not available</span>)
                    }
                </div>
                <div className="w-full md:w-2/3 flex flex-col gap-2 md:h-full">
                    <ul>
                        <li className="text-xl mb-5 whitespace-break-spaces overflow-hidden text-ellipsis"><span
                            className="font-bold">{location.title}</span></li>
                        <li><span className="font-bold">Prezzo per notte:&nbsp;</span>{location.priceForNight}</li>
                        <li><span className="font-bold">Persone per notte:&nbsp;</span>{location.maxAdultsForNight}</li>
                    </ul>
                </div>
            </Card>
        </Link>
    )
}

const MyLocationsList = () => {
    const {getMyLocations, locations, loading} = useMyLocations();

    useEffect(() => {
        getMyLocations();
    }, []);

    if (loading) return <ListLoader/>;

    return (
        <div className="flex flex-col gap-5">
            {locations.length === 0 && <p>Nessuna location trovata</p>}
            <Link className="ml-auto with-hover-border flex gap-2 items-center" href={ROUTES.ADD_LOCATION}>
                <i className="fi fi-tr-house-chimney-heart mt-1"></i>Aggiungi una location
            </Link>
            {locations.map(l => <Location key={l.id} location={l}/>)}
        </div>
    )
}

export default MyLocationsList;
