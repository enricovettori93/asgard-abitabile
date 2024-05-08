import React from "react";

export default function AuthLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <section className="w-full p-5">{children}</section>
    )
}
