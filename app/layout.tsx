import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KOL List',
  description: 'Connect with the most influential Chinese-speaking cryptocurrency KOLs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}