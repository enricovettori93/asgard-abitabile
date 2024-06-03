"use client"

import Image from "next/image";
import Card from "@/components/card";
import LocationSearchForm from "@/components/forms/location-search-form";
import useScrollListener from "@/hooks/useScrollListener";
import {Suspense} from "react";

export default function HeroBanner() {
    const {scrollFromTop} = useScrollListener();
    const marginTop = 0 - (scrollFromTop / 20);

    return (
        <section className="w-full flex flex-col sm:flex-row relative justify-end p-0 py-6 mb-5">
            <Image fill src="/hero.jpg" priority alt="homepage image" className="rounded-xl !relative !h-auto" style={{marginTop}}/>
            <Suspense>
                <Card className="sm:absolute mt-[-9rem] sm:mt-auto top-[2rem] sm:top-[10rem] md:left-[4rem] z-40 w-full md:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
                    <LocationSearchForm />
                </Card>
            </Suspense>
        </section>
    )
}
