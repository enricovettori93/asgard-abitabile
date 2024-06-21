import React, {ReactNode} from "react";

interface props {
    children: ReactNode
    className?: string
}

const CardTitle = ({children, className}: props) => {
    return (
        <div className={`text-2xl mb-5 font-bold ${className}`}>
            {children}
        </div>
    )
};

const CardContent = ({children, className}: props) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
};

const Card = React.forwardRef<HTMLDivElement, props>(({children, className}, ref) => {
    return (
        <div ref={ref} className={`rounded-lg shadow-xl p-8 bg-white ${className}`}>
            {children}
        </div>
    )
});

Card.displayName = "Card";

export const CardComposition = {
    Title: CardTitle,
    Content: CardContent
}

export default Card;
