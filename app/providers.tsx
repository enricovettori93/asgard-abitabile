"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";
import UiContext from "@/context/ui.context";
import UserContext from "@/context/user.context";

export default function Providers({children}: {children: React.ReactNode}) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <UiContext>
                <UserContext>
                    {children}
                </UserContext>
            </UiContext>
        </QueryClientProvider>
    );
}
