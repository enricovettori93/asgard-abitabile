import Quill from "quill";
import {useEffect, useState} from "react";
import Delta from "quill-delta";

const useQuillConvertDeltaToHtml = (content: Delta) => {
    const [html, setHtml] = useState<string>("");

    useEffect(() => {
        const tempQuill= new Quill(document.createElement("div"));
        tempQuill.setContents(content);
        setHtml(tempQuill.root.innerHTML);
    }, [content]);

    return {
        html
    }
}

export default useQuillConvertDeltaToHtml;
