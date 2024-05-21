import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {LocationAvailableWithPictures} from "@/types/location";
import Card from "@/components/card";

interface Props {
    location: LocationAvailableWithPictures
}

export default function CardLocation({ location }: Props) {
    return (
        <Card className="card-location shadow-md h-[30em] p-0 flex flex-col gap-4 w-full">
            <Swiper
                slidesPerView={1}
                modules={[Navigation]}
                navigation={location.pictures?.length > 0}
                className="w-full basis-9/12 rounded-tl-lg rounded-tr-lg"
            >
                {
                    location.pictures?.length > 0 && (
                        location.pictures?.map((img, idx) => (
                            <SwiperSlide key={`${idx}_${img.src}`} className="h-full">
                                <Image
                                    unoptimized
                                    src={`/${img.src}`}
                                    width={img.width}
                                    height={img.height}
                                    className="h-full w-full object-cover rounded-xl"
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
            <div className="basis-3/12 flex flex-col gap-1">
                <span className="font-bold">{location.title}</span>
                {!location.isAvailable && (
                    <span className="text-red-500 font-semibold text-sm">Non disponibile per le date selezionate</span>
                )}
            </div>
        </Card>
    )
}
