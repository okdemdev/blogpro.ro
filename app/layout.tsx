import './globals.css';
import { ThemeProvider } from './components/dashboard/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import localFont from 'next/font/local';
import AdSense from './components/shared/AdSense';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata = {
  title: 'Blog Pro',
  description: 'Set up your blog in minutes',
  icons: {
    icon: '/logo.svg', // Add your favicon here
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <AdSense pId="2141920018752286" />
      </head>
      <body className={`${geistSans.className} ${geistMono.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
