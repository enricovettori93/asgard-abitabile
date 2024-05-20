import {FieldError} from "react-hook-form";
import React from "react";

interface props {
    error?: FieldError
    children?: React.ReactNode
    className?: string
}

const FieldWrapper = ({error, className = "", children}: props) => {
    return (
        <div className={`field-wrapper ${className} ${error ? "field-wrapper--error" : ""}`}>
            {children}
            <small className="text-xs text-red-500 h-4">{error?.message}</small>
        </div>
    )
}

export default FieldWrapper;
