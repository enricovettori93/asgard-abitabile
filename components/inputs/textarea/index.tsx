import React from 'react';
import {UseFormRegisterReturn} from "react-hook-form";
import classNames from "classnames";

interface props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    id: string
    name: string
    label?: string
    touched?: boolean
    dirty?: boolean
    register?: UseFormRegisterReturn<any>
}

const TextArea = ({label, id, name, className = "", touched, dirty, ...rest}: props) => {
    const classes = classNames({
        [className]: true,
        "input--touched": touched,
        "input--dirty": dirty,
        // @ts-ignore fixme: refactor this code with refs
        "input--with-value": typeof document !== "undefined" && !!(document.querySelector(`textarea#${id}`)?.value || "")
    });

    return (
        <>
            {!!label && (<label htmlFor={id}>{label}</label>)}
            <textarea className={classes} id={id} {...rest} {...rest.register}/>
        </>
    );
};

export default TextArea;
