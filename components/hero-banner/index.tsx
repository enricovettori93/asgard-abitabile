import Image from "next/image";
import Card from "@/components/card";
import LocationSearchForm from "@/components/hero-banner/location-search-form";

export default function HeroBanner() {
    return (
        <section className="w-full flex relative justify-end p-16">
            <Image width={1023} height={682} src="/hero.jpg" priority alt="homepage image" className="rounded-xl" />
            <Card className="absolute top-[15rem] left-[4rem] z-9">
                <LocationSearchForm />
            </Card>
        </section>
    )
}
