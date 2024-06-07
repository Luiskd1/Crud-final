"use client"
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { Toaster } from '../ui/toaster';

const client = new QueryClient();

interface Props {
    children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
    return (
        <QueryClientProvider client={client}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster/>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
  }
  