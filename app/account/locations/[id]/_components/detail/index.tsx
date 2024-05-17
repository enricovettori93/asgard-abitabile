"use client"

import useGetLocationDetail from "@/app/account/locations/[id]/_components/detail/hooks/useGetLocationDetail";
import {useEffect} from "react";
import {useParams} from "next/navigation";
import {Location, Picture} from "@prisma/client";
import ImageDetail from "@/app/account/locations/[id]/_components/detail/image-detail";
import useRemoveImage from "@/app/account/locations/[id]/_components/detail/hooks/useRemoveImage";

const MyAccountLocationDetail = () => {
    const {id} = useParams<{id: Location["id"]}>();
    const {loading: getLocationLoading, location, getLocationDetail} = useGetLocationDetail();
    const {removeImage} = useRemoveImage();

    useEffect(() => {
        getLocationDetail(id);
    }, []);

    const handleRemoveImage = async (pictureId: Picture["id"]) => {
        await removeImage(location!.id, pictureId);
        await getLocationDetail(id);
    }

    if (getLocationLoading) {
        return (<p>Loading location..</p>)
    }

    return (
        <>
            <div>
                Immagini presenti
                {
                    location?.pictures?.map(img => <ImageDetail key={img.id} image={img} handleRemovePicture={handleRemoveImage} />)
                }
            </div>
            {JSON.stringify(location)}
        </>
    )
}

export default MyAccountLocationDetail;
