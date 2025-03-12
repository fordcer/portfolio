import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "A professional web developer portfolio showcasing skills and projects",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'