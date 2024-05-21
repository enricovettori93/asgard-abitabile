import React, {ReactNode} from "react";

interface props {
    children: ReactNode
    className?: string
}

const Card = React.forwardRef<HTMLDivElement, props>(({children, className}, ref) => {
    return (
        <div ref={ref} className={`rounded-lg shadow-xl p-8 bg-white ${className}`}>
            {children}
        </div>
    )
});

export default Card;
