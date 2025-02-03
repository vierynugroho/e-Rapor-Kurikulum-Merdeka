import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import TanstackProvider from '@/components/providers/tanstack-provider';
import { ToastProvider } from '@/components/providers/toaster-provider';
import { AuthSessionProvider } from '@/components/providers/session-provider';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});

const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'e-Rapor TK Negeri 2 Sananwetan',
    description: 'e-Rapor Kurikulum Merdeka TK Negeri 2 Sananwetan Kota Blitar',
    icons: {
        icon: '/assets/Viery_Nugroho.png',
        // Opsional
        apple: '/assets/Viery_Nugroho.png',
        shortcut: '/assets/Viery_Nugroho.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthSessionProvider>
                        <TanstackProvider>
                            <ToastProvider>{children}</ToastProvider>
                        </TanstackProvider>
                    </AuthSessionProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
