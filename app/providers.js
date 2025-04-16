'use client';
import {
    isServer,
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import * as React from 'react';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 60 * 1000
            }
        }
    })
}

let browserQueryClient = null;

function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    }else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }
        return browserQueryClient;
    }
}

export function Providers({ children }) {
    const queryClient = getQueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
                <ReactQueryDevtools />
                {children}
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    );
}