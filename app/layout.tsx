import {Poppins } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"


const poppins = Poppins({subsets:['latin'],weight:['400','500','600','700'],variable:'--font-poppins'})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={poppins.className}
    >
      <body className="max-w-7xl mx-auto">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
