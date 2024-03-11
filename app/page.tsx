import dynamic from "next/dynamic";
import HeroBanner from "@/components/hero-banner";
const WhatCanDo = dynamic(() => import("@/components/what-can-do"), { ssr: false })

export default function Home() {
  return (
    <>
        <HeroBanner />
        <WhatCanDo />
        <section className="h-[25em]">
            bla bla bla
        </section>
    </>
  );
}
