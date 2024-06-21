"use client"

import {Swiper, SwiperSlide} from 'swiper/react';
import Card, {CardComposition} from "@/components/card";
import useSlidesPerView from "@/app/_components/what-can-do/hooks/useSlidesPerView";

export default function WhatCanDo() {
    const {slides} = useSlidesPerView();

    return (
        <section className="w-full bg-orange-400 gap-10 p-16 rounded-2xl">
            <Swiper
                slidesPerView={slides}
                spaceBetween={50}
            >
                <SwiperSlide className="h-auto">
                    <Card className="w-full h-full">
                        <CardComposition.Title className="flex justify-between">
                            <span>Scopri il piacere di perderti</span>
                            <i className="fi fi-rr-world ml-2 mt-1"></i>
                        </CardComposition.Title>
                        <CardComposition.Content>
                            <p>
                                Esplora un mondo di locations! Immergiti nella natura, nella cittá o ovunque tu voglia.
                                Trova il tuo prossimo luogo per le ferie, le vacanze e molto altro.
                            </p>
                        </CardComposition.Content>
                    </Card>
                </SwiperSlide>
                <SwiperSlide className="h-auto">
                    <Card className="w-full h-full">
                        <CardComposition.Title className="flex justify-between">
                            <span>Diventa un host</span>
                            <i className="fi fi-rr-users-alt ml-2 mt-1"></i>
                        </CardComposition.Title>
                        <CardComposition.Content>
                            <p>
                                Hai sempre desiderato poter condividere un luogo che ami con altre persone? Crea il tuo account e inizia a pubblicare!
                            </p>
                        </CardComposition.Content>
                    </Card>
                </SwiperSlide>
                <SwiperSlide className="h-auto">
                    <Card className="w-full h-full">
                        <CardComposition.Title className="flex justify-between">
                            <span>Ospitalità autentica, ovunque</span>
                            <i className="fi fi-rr-users-alt ml-2 mt-1"></i>
                        </CardComposition.Title>
                        <CardComposition.Content>
                            <p>
                                Non accettiamo agenzie o hotel come hosts, troverai sempre persone del luogo che potranno consigliarti il miglior modo possibile di vivere la tua vacanza.
                            </p>
                        </CardComposition.Content>
                    </Card>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}
