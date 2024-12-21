import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://cybergoblin.club'),
  title: {
    template: '%s | 사이버도깨비 클럽',
    default: '사이버도깨비 클럽 | AI 챗봇 & GPTs 체험공간'
  },
  description: '사이버도깨비가 만드는 AI 챗봇과 GPTs를 체험할 수 있는 공간입니다.',
  keywords: ['AI 챗봇', 'GPTs', '윤루카스', '민희진', '사이버도깨비'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://cybergoblin.club',
    title: '사이버도깨비 클럽 | AI 챗봇 & GPTs 체험공간',
    description: '사이버도깨비가 만드는 AI 챗봇과 GPTs를 체험할 수 있는 공간입니다.',
    images: ['/images/cybergoblin.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '사이버도깨비 클럽 | AI 챗봇 & GPTs 체험공간',
    description: '사이버도깨비가 만드는 AI 챗봇과 GPTs를 체험할 수 있는 공간입니다.',
    images: ['/images/cybergoblin.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2077902786597790"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <GoogleAnalytics />
        {children}
        <Analytics />
      </body>
    </html>
  )
} 