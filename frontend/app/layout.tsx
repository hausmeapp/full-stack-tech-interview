import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import "./globals.css"

export const metadata: Metadata = {
    title: "HausMe Interview",
    description: "Renovation Cost Calculator",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-50">
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    )
}
