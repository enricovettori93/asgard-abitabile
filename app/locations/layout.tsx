import React from "react";

export default function LocationsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="p-5">{children}</section>
    )
}
