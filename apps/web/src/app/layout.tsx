// server component
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@autospace/ui/src/app/globals.css';
import { ApolloProvider } from '@autospace/network/src/config/apollo';
import { SessionProvider } from '@autospace/ui/src/components/molecules/SessionProvider';
import { Header } from '@autospace/ui/src/components/organisms/Header';
import { Container } from '@autospace/ui/src/components/atoms/Container';
import { MenuItem } from '@autospace/util/types';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Autoparking',
  description: 'Nest + Next project',
};

const MENUITEMS: MenuItem[] = [
  { label: 'Search', href: '/search' },
  { label: 'Bookings', href: '/bookings' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <ApolloProvider>
          <body className={`${inter.className} bg-gray-50`}>
            <Header menuItems={MENUITEMS} />
            <Container>{children}</Container>
          </body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  );
}
