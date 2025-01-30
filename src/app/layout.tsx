import '@/app/ui/global/globals.css'
import { Metadata } from 'next';
// import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
  title: {
    template: '%s | Lorem',
    default: 'Lorem',
  },
  description: 'The official Next.js Course Dashboard, build with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({  
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        {/* <SessionProvider>{children}</SessionProvider> */}
        {children}
      </body>
    </html>
  );
}
