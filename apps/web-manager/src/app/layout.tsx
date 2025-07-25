import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@autospace/ui/src/app/globals.css'
import { MenuItem } from '@autospace/util/types'
import { ApolloProvider } from '@autospace/network/src/config/apollo'
import { SessionProvider } from '@autospace/ui/src/components/molecules/SessionProvider'
import { ToastContainer } from '@autospace/ui/src/components/molecules/Toast'
import { Container } from '@autospace/ui/src/components/atoms/Container'
import { Header } from '@autospace/ui/src/components/organisms/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Autoparking | Manager',
  description: 'Nest + Next project',
}

const MENUITEMS: MenuItem[] = [
  { label: 'New Garage', href: '/new-garage' },
  { label: 'Valets', href: '/valets' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-25`}>
        <SessionProvider>
          <ApolloProvider>
            <Header type="manager" menuItems={MENUITEMS} />
            <Container>{children}</Container>
          </ApolloProvider>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
