"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import Card from "@/components/card";
import useSlidesPerView from "@/app/_components/what-can-do/hooks/useSlidesPerView";

export default function WhatCanDo() {
    const { slides } = useSlidesPerView();

    return (
        <section className="w-full bg-orange-400 gap-10 p-16">
            <Swiper
                slidesPerView={slides}
                spaceBetween={50}
            >
                <SwiperSlide>
                    <Card className="w-full h-[20em]">
                        ciao
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card className="w-full h-[20em]">
                        ciao
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card className="w-full h-[20em]">
                        ciao
                    </Card>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}
