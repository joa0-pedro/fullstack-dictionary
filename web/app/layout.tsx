"use client"

import { AuthProvider } from "./provider/AuthProvider";
import { ThemeProvider } from "./provider/ThemeProvider";
import "./globals.css";
import BaseLayout from '@/components/BaseLayout';
import ToastProvider from './provider/ToastProvider';

export default function RootLayout({ children }: Readonly<{
	children: React.ReactNode;
  }>) {

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="min-h-screen bg-[#F8FAFC] dark:bg-[#020817] font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
			<AuthProvider>
			<BaseLayout>
				<ToastProvider>
				{children}
				</ToastProvider>
			</BaseLayout>
			</AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

