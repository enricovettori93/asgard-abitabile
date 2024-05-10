import {FieldError} from "react-hook-form";
import React from "react";

interface props {
    error: FieldError | undefined
    children?: React.ReactNode
    className?: string
}

const FieldWrapper = ({error, className = "", children}: props) => {
    return (
        <div className={`flex flex-col ${className}`}>
            {children}
            {error && (<small className="text-red-500">{error.message}</small>)}
        </div>
    )
}

export default FieldWrapper;
