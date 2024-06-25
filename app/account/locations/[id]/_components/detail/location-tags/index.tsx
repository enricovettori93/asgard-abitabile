import {Tag} from "@prisma/client";
import TagPill from "@/components/tag-pill";

interface props {
    tags: Tag[]
    locationTags: Tag[]
    onRemove: (tagId: Tag["id"]) => void
    onAdd: (tagId: Tag["id"]) => void
}

const LocationTags = ({tags, locationTags, onRemove, onAdd}: props) => {
    const locationTagIds = locationTags.map(tag => tag.id);
    return (
        <div className="flex flex-wrap gap-5">
            {tags.map(tag => {
                const props: Partial<Pick<props, "onRemove" | "onAdd">> = {};

                if (locationTagIds.includes(tag.id)) {
                    props.onRemove = () => onRemove(tag.id);
                } else {
                    props.onAdd = () => onAdd(tag.id);
                }
                return <TagPill tag={tag} key={tag.id} {...props}/>
            })}
        </div>
    )
}

export default LocationTags;
