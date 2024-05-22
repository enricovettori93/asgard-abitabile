import {Picture} from "@prisma/client";
import Image from "next/image";
import ImageActionsContainer from "@/components/forms/image-actions-container";

interface props {
    image: Pick<Picture, "id" | "src" | "width" | "height" | "alt">
    fill?: boolean
    onRemovePicture: (id: Picture["id"]) => void
}

const ImageDetail = ({image, onRemovePicture, fill = false}: props) => {
    return (
        <ImageActionsContainer onRemovePicture={() => onRemovePicture(image.id)}>
            <Image
                src={`/${image.src}`}
                {...(fill && {fill: true})}
                {...(!fill && {
                    width: image.width,
                    height: image.height
                })}
                alt={image.alt || ""}
                className="h-full w-full"
            />
        </ImageActionsContainer>
    )
}

export default ImageDetail;
