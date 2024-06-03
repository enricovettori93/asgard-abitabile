import React from "react";

export default function AuthLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <section className="w-full md:w-[60%] relative md:mt-10">{children}</section>
    )
}
