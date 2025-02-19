import type { Metadata, Viewport } from 'next'

import './globals.css'

import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import ReactQueryProvider from '@/components/providers/react-query-provider'
import SupabaseProvider from '@/components/providers/supabase-provider'
import ThemeProvider from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'AUCTIONS',
    template: '%s – AUCTIONS',
  },
  description:
    'Auctions platform for rare wines and spirits',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? ''),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Auctions',
    images: [
      {
        url: '/cocktail-glass.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    'Wines',
    'Spirits',
    'Auctions'
  ],
}

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/szx7qnb.css" />
      </head>
      <body className={`min-h-screen antialiased ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <SupabaseProvider>
              <TooltipProvider>
                <div className="relative flex min-h-screen flex-col sm:overflow-hidden">
                  {children}
                </div>
                <Analytics />
                <SpeedInsights />
                <Toaster richColors />
              </TooltipProvider>
            </SupabaseProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
