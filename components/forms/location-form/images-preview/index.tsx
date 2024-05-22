"use client"

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import ImageActionsContainer from "@/components/forms/image-actions-container";

interface props {
    files: File[]
    onRemovePicture: (idx: number) => void
}

const LocationFormImagesPreview = ({files, onRemovePicture}: props) => {
    return (
        <div className="h-[40rem]">
            <Swiper
                className="h-full"
                modules={[Navigation]}
                navigation={files.length > 1}>
                {
                    files.map((file, idx) => {
                        const url = URL.createObjectURL(file);

                        return (
                            <SwiperSlide key={idx}>
                                <ImageActionsContainer className="h-full flex justify-center" onRemovePicture={() => onRemovePicture(idx)}>
                                    <img src={url} alt={file.name} className="h-full object-contain"/>
                                </ImageActionsContainer>
                            </SwiperSlide>
                        );
                    })
                }
            </Swiper>
        </div>
    );
};

export default LocationFormImagesPreview;
