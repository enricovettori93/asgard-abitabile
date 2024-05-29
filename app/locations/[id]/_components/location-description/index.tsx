"use client"

import {Location} from "@prisma/client";
import useQuillConvertDeltaToHtml from "@/hooks/useQuillConvertDeltaToHtml";
import Delta from "quill-delta";
import classNames from "classnames";

interface Props {
    location: Location
    className?: string
}

const LocationDescription = ({ location, className = "" }: Props) => {
    const {html} = useQuillConvertDeltaToHtml(location.description as unknown as Delta);

    const classes = classNames({
        "location__description": true,
        [className]: true
    });

    return (
        <div className={classes}>
            <div dangerouslySetInnerHTML={{__html: html}}></div>
        </div>
    );
};

export default LocationDescription;
