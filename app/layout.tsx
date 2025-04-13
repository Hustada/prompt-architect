import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'PromptArchitect',
  description: 'Design and build structured AI prompts from your ideas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans perspective-container`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* Animated background grid with parallax effect */}
            <div className="fixed inset-0 bg-grid opacity-50 z-0"></div>
            
            {/* Main content with depth effect */}
            <main className="relative z-10 min-h-screen p-4 md:p-8 lg:p-12">
              <header className="mb-10 text-center depth-layer-2">
                <h1 className="text-4xl font-bold text-black dark:text-white font-mono">
                  PromptArchitect
                </h1>
                <p className="text-gray-700 dark:text-gray-300 text-lg mt-2">
                  Transform your ideas into structured AI prompts with precision
                </p>
              </header>
              <div className="depth-layer-1">
                {children}
              </div>
            </main>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
