import {Picture} from "@prisma/client";
import Image from "next/image";

interface props {
    image: Picture
    handleRemovePicture: (id: Picture["id"]) => void
}

const ImageDetail = ({image, handleRemovePicture}: props) => {
    return (
        <div className="relative">
            <button className="absolute top-5 right-5 bg-red-500 p-5 rounded-2xl" onClick={() => handleRemovePicture(image.id)}>X</button>
            <Image
                src={`/${image.src}`}
                width={image.width}
                height={image.height}
                alt={image.alt || ""}
            />
        </div>
    )
}

export default ImageDetail;
