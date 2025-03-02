import type { Metadata } from "next";
import { Kanit } from 'next/font/google'
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles'
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
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
