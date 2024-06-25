import {LocationWithPicturesAndUserAndTags} from "@/types/location";
import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import classNames from "classnames";

interface props {
    location: LocationWithPicturesAndUserAndTags
    className?: string
}

const LocationDetailGallery = ({location: {pictures = []}, className = ""}: props) => {
    const swiperClasses = classNames({
        "h-full w-full rounded-2xl": true,
        [className]: true
    });

    return (
        <Swiper
            className={swiperClasses}
            modules={[Navigation]}
            navigation={pictures.length > 1}
        >
            {
                pictures?.map(image =>
                    <SwiperSlide key={image.id}>
                        <Image
                            src={`/${image.src}`}
                            width={image.width}
                            height={image.height}
                            alt={image.alt || ""}
                            className="h-full max-w-full object-cover"
                        />
                    </SwiperSlide>
                )
            }
        </Swiper>
    );
};

export default LocationDetailGallery;
