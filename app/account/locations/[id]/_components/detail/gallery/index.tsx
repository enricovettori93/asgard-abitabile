import React from 'react';
import {LocationWithPicturesAndReservations} from "@/types/location";
import {Swiper, SwiperSlide} from "swiper/react";
import ImageDetail from "@/app/account/locations/[id]/_components/detail/image-detail";
import {Picture} from "@prisma/client";
import classNames from "classnames";

interface props {
    className?: string
    pictures: LocationWithPicturesAndReservations["pictures"]
    onRemoveImage: (id: Picture["id"]) => void;
}

const LocationDetailGallery = ({pictures, onRemoveImage, className = ""}: props) => {
    const classes = classNames({
        [className]: true
    });

    return (
        <div className={classes}>
            {
                pictures?.length === 0 && (<p>Nessuna immagine presente</p>)
            }
            {
                pictures?.length > 0 && (
                    <>
                        Immagini presenti
                        <Swiper>
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
