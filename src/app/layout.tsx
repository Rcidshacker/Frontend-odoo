
import type {Metadata} from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/context/user-context';
import { FloatingNavDemo } from '@/components/floating-nav-demo';
import { ChatWidget } from '@/components/chat-widget';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'SkillSphere',
  description: 'A platform to swap skills and connect with community.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background font-body antialiased">
        <UserProvider>
          <FloatingNavDemo />
          <main className="pt-20">{children}</main>
          <ChatWidget />
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
