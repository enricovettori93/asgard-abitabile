import Image from "next/image";
import Card from "@/components/card";
import LocationSearchForm from "@/components/forms/location-search-form";

export default function HeroBanner() {
    return (
        <section className="w-full flex flex-col sm:flex-row relative justify-end p-0 py-6">
            <Image fill src="/hero.jpg" priority alt="homepage image" className="rounded-xl !relative !h-auto"/>
            <Card className="sm:absolute mt-[-5rem] sm:mt-auto top-[2rem] sm:top-[15rem] md:left-[4rem] z-40 w-full md:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
                <LocationSearchForm />
            </Card>
        </section>
    )
}
