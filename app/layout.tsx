import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-gray-50 dark:bg-gray-900`}>
        <div className="fixed inset-0 bg-grid-blueprint opacity-5 z-0"></div>
        <main className="relative z-10 min-h-screen p-4 md:p-8 lg:p-12">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-300 font-mono">
              PromptArchitect
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
              Transform your ideas into structured AI prompts with precision
            </p>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
