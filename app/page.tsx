import dynamic from "next/dynamic";
import HeroBanner from "@/app/_components/hero-banner";

const WhatCanDo = dynamic(() => import("@/app/_components/what-can-do"), {ssr: false})

export default function Home() {
    return (
        <>
            <HeroBanner/>
            <WhatCanDo/>
            <section className="h-[25em]">
                bla bla bla
            </section>
        </>
    );
}
