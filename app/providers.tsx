"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";
import UiContext from "@/context/ui.context";
import UserContext from "@/context/user.context";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Providers({children}: {children: React.ReactNode}) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <UiContext>
                <UserContext>
                    {children}
                </UserContext>
            </UiContext>
        </QueryClientProvider>
    );
}
