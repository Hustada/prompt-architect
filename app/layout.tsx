import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Prompt Formatter',
  description: 'Format text input into markdown files for AI coding projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen p-4 md:p-8 lg:p-12">
          {children}
        </main>
      </body>
    </html>
  );
}
