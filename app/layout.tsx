import { Toaster } from 'sonner'
import type { Metadata } from 'next'
import { Bricolage_Grotesque, Inconsolata } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
  metadataBase: new URL('https://chat.trinhvaphuong.com'),
  title: 'Chat - Trinh & Phương',
  description: 'AI ChatBot',
}

export const viewport = {
  maximumScale: 1,
}

const sans = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const monospaced = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-monospaced',
})

const LIGHT_THEME_COLOR = 'hsl(0 0% 100%)'
const DARK_THEME_COLOR = 'hsl(240deg 10% 3.92%)'
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${monospaced.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Toaster position="top-center" />
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
