"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import LocationReserveForm from "@/app/locations/[id]/_components/location-reserve-form";
import {useContext} from "react";
import {UserContext} from "@/context/user.context";
import Loader from "@/components/loader";
import dynamic from "next/dynamic";
import {LocationWithPicturesAndUserAndTags} from "@/types/location";
import LocationGallery from "@/app/locations/[id]/_components/location-gallery";
import Card from "@/components/card";
import Link from "next/link";
import {ROUTES} from "@/utils/constants";
import TagPill from "@/components/tag-pill";
const LocationDescription = dynamic(() => import('@/app/locations/[id]/_components/location-description'), {ssr: false});

interface Props {
    location: LocationWithPicturesAndUserAndTags
}

export function LocationDetail({ location }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const queryParams = useSearchParams();
    const {isLogged, ready} = useContext(UserContext);

    return (
        <>
            <button className="font-semibold with-hover-border p-0 mb-5 md:mb-8" type="button" onClick={() => router.back()}>
                <i className="fi fi-ts-angle-small-left"></i>&nbsp;<span>Torna alla lista</span>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 h-[50rem] md:h-[30rem] gap-10">
                <div className="col-span-1 md:col-span-2">
                    {location.pictures?.length > 0 ? (
                        <LocationGallery location={location}/>
                    ) : <p>Nessuna immagine presente per questa location</p>}
                </div>
                <div className="flex flex-col justify-center col-span-1">
                    {
                        !ready && (
                            <Loader/>
                        )
                    }
                    {
                        ready && (
                            <Card className="w-full mb-5">
                                {!isLogged &&
                                    <p className="mb-5 text-xl">
                                        <Link href={{
                                            pathname: ROUTES.AUTH,
                                            query: {returnUrl: `${pathname}/${queryParams.toString()}`}
                                        }} className="with-hover-border font-semibold">Accedi</Link> con il tuo account per
                                        prentare questa struttura!
                                    </p>
                                }
                                <LocationReserveForm className="relative w-full" location={location} disabled={!isLogged}/>
                            </Card>
                        )
                    }
                    <div className="flex flex-wrap">
                        {
                            location.tags.length > 0 && (
                                <div className="flex mt-5">
                                    {location.tags.map(t => <TagPill key={t.id} tag={t}/>)}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Card className="mt-10">
                <div className="flex flex-col gap-5">
                    <h2 className="text-semibold text-2xl">Descrizione dell'alloggio</h2>
                    <LocationDescription location={location}/>
                </div>
                <div className="mt-10">
                    <span>Alloggerai presso <strong>{location.user.name} {location.user.surname}</strong></span>
                </div>
            </Card>
        </>
    )
}
