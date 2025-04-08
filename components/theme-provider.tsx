'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
// import { type ThemeProviderProps } from 'next-themes/dist/types';

type Attribute = 'class' | 'data-theme'; // Example values

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute: Attribute | Attribute[] | undefined;
  defaultTheme: string;
  enableSystem: boolean;
  // Add any other props you expect to use
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
