import React from 'react';
import {LocationWithPicturesAndReservations} from "@/types/location";
import {Swiper, SwiperSlide} from "swiper/react";
import ImageDetail from "@/app/account/locations/[id]/_components/detail/image-detail";
import {Picture} from "@prisma/client";
import classNames from "classnames";
import {Navigation} from "swiper/modules";

interface props {
    className?: string
    pictures: LocationWithPicturesAndReservations["pictures"]
    onRemoveImage: (id: Picture["id"]) => void;
}

const LocationDetailGallery = ({pictures, onRemoveImage, className = ""}: props) => {
    const classes = classNames({
        "h-full w-full": true,
        [className]: true
    });

    return (
        <div className={classes}>
            {
                pictures?.length === 0 && (<p>Nessuna immagine presente, aggiungine con il form di modifica.</p>)
            }
            {
                pictures?.length > 0 && (
                    <>
                        <Swiper
                            className="h-full"
                            modules={[Navigation]}
                            navigation={pictures.length > 1}
                        >
                            {
                                pictures?.map(img =>
                                    <SwiperSlide key={img.id}>
                                        <ImageDetail image={img} onRemovePicture={() => onRemoveImage(img.id)} />
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>
                    </>
                )
            }
        </div>
    );
};

export default LocationDetailGallery;
