'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react'
import { mainTheme } from '~themes/mainTheme.ts'
import { useState } from 'react';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider themes={[mainTheme]}>
                    {children}
                </ChakraProvider>
            </QueryClientProvider>
        </>
    );
};

export default AppProvider;
