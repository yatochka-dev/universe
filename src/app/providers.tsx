"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type {ReactNode} from "react";

interface ProvidersProps {
    children: ReactNode
}

export function Providers({
                                  children,
                              }: ProvidersProps) {
    return <NextThemesProvider
    attribute={'class'}
    defaultTheme={'system'}
    enableSystem
    disableTransitionOnChange
    >{children}</NextThemesProvider>
}