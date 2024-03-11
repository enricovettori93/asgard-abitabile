"use client"
import Image from 'next/image'
import Link from "next/link";
import {Swiper, SwiperSlide} from 'swiper/react';
import {LocationWithPictures} from "@/types/location";

interface Props {
    location: LocationWithPictures
}

export default function CardLocation({ location }: Props) {
    return (
        <div className="flex flex-col mt-5">
            <Link href={`/locations/${location.id}`}>
                <Swiper
                    slidesPerView={1}
                    className="w-full"
                >
                    {
                        location.pictures?.length > 0 && (
                            location.pictures?.map(img => (
                                <SwiperSlide key={img.src}>
                                    <Image
                                        unoptimized
                                        src={img.src}
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

                name: {location.title}
                lng: {location.lng}
                lat: {location.lat}
                description: {location.description}
            </Link>

        </div>
    )
}
