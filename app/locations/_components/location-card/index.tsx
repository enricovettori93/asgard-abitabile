"use client"
import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react';
import {LocationAvailableWithPictures} from "@/types/location";
import Card from "@/components/card";

interface Props {
    location: LocationAvailableWithPictures
}

export default function CardLocation({ location }: Props) {
    return (
        <Card className="card-location shadow-md h-[30em] p-0 flex flex-col w-full">
            <Swiper
                slidesPerView={1}
                className="w-full basis-10/12 rounded-tl-lg rounded-tr-lg"
            >
                {
                    location.pictures?.length > 0 && (
                        location.pictures?.map((img, idx) => (
                            <SwiperSlide key={`${idx}_${img.src}`}>
                                <Image
                                    unoptimized
                                    src={`/${img.src}`}
                                    width={img.width}
                                    height={img.height}
                                    alt={img?.alt || "Description not available"}
                                />
                            </SwiperSlide>
                        ))
                    )
                }
                {
                    !location.pictures && (
                        <SwiperSlide>Image not available</SwiperSlide>
                    )
                }
            </Swiper>
            <div className="basis-2/12 flex flex-col gap-1 p-5">
                <span className="font-bold">{location.title}</span>
                <span>{location.description}</span>
                {!location.isAvailable && (
                    <span className="text-red-500 font-semibold text-sm">Non disponibile per le date selezionate</span>
                )}
            </div>
        </Card>
    )
}
