'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ClientProps{
    children:React.ReactNode
}

const client = new QueryClient()

export default function ClientProvider({children}:ClientProps){
    return(
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}