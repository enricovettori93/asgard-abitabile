"use client"

import {Tag} from "@prisma/client";
import {useSearchParams} from "next/navigation";
import {ROUTES} from "@/utils/constants";
import Link from "next/link";
import classNames from "classnames";

interface props {
    tag: Tag
    className?: string
}

const TagLink = ({tag, className = ""}: props) => {
    const params = useSearchParams();
    const tags = params.get("tags")?.split(",") || [];

    const isActive = tags.includes(tag.value);
    const nextTags = isActive ? tags.filter(t => t !== tag.value) : tags.concat(tag.value);

    const style = classNames({
        "with-hover-border": true,
        "active": isActive,
        [className]: true
    });

    const {tags: _, ...rest} = Object.fromEntries(params.entries());

    const queryParams = {
        page: 1,
        ...rest,
        ...nextTags.length > 0 && {tags: nextTags.join(",")}
    };

    return (
        <Link href={{pathname: ROUTES.LOCATIONS, query: queryParams}} className={style}>
            {tag.value}
        </Link>
    )
}

export default TagLink;
