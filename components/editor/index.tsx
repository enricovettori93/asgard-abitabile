"use client"
import {forwardRef, useEffect, useRef} from 'react';
import Quill from "quill";
import Delta from "quill-delta";

interface props {
    defaultValue?: Delta
}

// code example: https://quilljs.com/playground/react
const Editor = forwardRef<Quill, props>(
    ({ defaultValue }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const defaultValueRef = useRef(defaultValue);

        useEffect(() => {
            if (!ref) return ;
            const container = containerRef.current;
            const editorContainer = container!.appendChild(
                container!.ownerDocument.createElement('div'),
            );

            const quill = new Quill(editorContainer, {
                theme: 'snow',
            });

            // @ts-ignore
            ref.current = quill;

            if (defaultValueRef.current) {
                quill.setContents(defaultValueRef.current);
            }

            return () => {
                // @ts-ignore
                ref.current = null;
                container!.innerHTML = '';
            };
        }, [ref]);

        return <div ref={containerRef}></div>;
    },
);

Editor.displayName= "Editor";

export default Editor;
