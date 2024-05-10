import Image from "next/image";
import Card from "@/components/card";
import LocationSearchForm from "@/components/location-search-form";

export default function HeroBanner() {
    return (
        <section className="w-full flex relative justify-end p-16">
            <Image width={1023} height={682} src="/hero.jpg" priority alt="homepage image" className="rounded-xl" />
            <Card className="absolute top-[15rem] md:left-[4rem] z-9 w-[90vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
                <LocationSearchForm />
            </Card>
        </section>
    )
}
