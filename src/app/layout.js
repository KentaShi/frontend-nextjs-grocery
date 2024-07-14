import { Inter } from "next/font/google"
import "./globals.css"

import { AuthProvider } from "@/contexts/auth/providerAuth"
import { Toaster } from "react-hot-toast"

import { CategoryProvider } from "@/contexts/category/providerCate"
import { SocketProvider } from "@/contexts/socket/providerSocket"
import { ProductProvider } from "@/contexts/product/providerProductV2"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Tạp Hóa Chị Tuyết",
    description: "Tạp Hóa Chị Tuyết",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <AuthProvider>
                <SocketProvider>
                    <CategoryProvider>
                        <ProductProvider>
                            <body>
                                {children}
                                <Toaster />
                            </body>
                        </ProductProvider>
                    </CategoryProvider>
                </SocketProvider>
            </AuthProvider>
        </html>
    )
}
