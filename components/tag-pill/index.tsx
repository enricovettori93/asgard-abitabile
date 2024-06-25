import {Tag} from "@prisma/client";
import classNames from "classnames";

interface props {
    tag: Tag
    onRemove?: (tagId: Tag["id"]) => void
    onAdd?: (tagId: Tag["id"]) => void
    className?: string
}

const TagPill = ({tag, onRemove, onAdd, className = ""}: props) => {
    const style = classNames({
        "rounded-3xl px-4 py-2 flex gap-3 items-center": true,
        [className]: true
    });

    return (
        <span className={style} style={{backgroundColor: `#${tag.color}`}}>
            <span className={className}>{tag.value}</span>
            {onRemove && <button className="p-0" onClick={() => onRemove(tag.id)}><i className="fi fi-rr-cross"></i></button>}
            {onAdd && <button className="p-0" onClick={() => onAdd(tag.id)}><i className="fi fi-rs-plus"></i></button>}
        </span>
    )
}

export default TagPill;
