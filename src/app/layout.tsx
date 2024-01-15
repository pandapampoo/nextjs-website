import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GlobalProvider } from './GlobalProvider'
import Toast from '@/components/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shop Next App',
  description: 'Dummy ecommerce ',
}
export const revalidate = 3600
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <Header/>
          {children}
          <Footer/>
        </GlobalProvider>
        <Toast/>
      </body>
    </html>
  )
}
