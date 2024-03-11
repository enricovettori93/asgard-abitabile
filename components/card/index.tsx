import React from "react";

interface Props {
    children: React.ReactNode
    className?: string
}

export default function Card({ children, className }: Props) {
    return (
        <div className={`rounded-lg shadow-xl p-8 bg-white ${className}`}>
            {children}
        </div>
    )
}
