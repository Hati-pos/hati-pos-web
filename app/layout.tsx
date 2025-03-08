

import type { Metadata } from "next";
import { Kanit } from 'next/font/google'
import { ThemeProvider } from '@/theme/ThemeProvider';

const kanit = Kanit({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: "Welcome to HATI POS",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {


  return (
    <html lang="en">
      <body
        className={kanit.className}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
