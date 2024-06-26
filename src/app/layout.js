import { Inter } from "next/font/google"
import "./globals.css"

import { AuthProvider } from "@/contexts/auth/providerAuth"
import { Toaster } from "react-hot-toast"
import { ProductProvider } from "@/contexts/product/providerProduct"
import { CategoryProvider } from "@/contexts/category/providerCate"
import { SocketProvider } from "@/contexts/socket/providerSocket"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Tạp Hóa Chị Tuyết",
    description: "Tạp Hóa Chị Tuyết",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <SocketProvider>
                <AuthProvider>
                    <CategoryProvider>
                        <ProductProvider>
                            <body className="bg-dark-1">
                                {children}
                                <Toaster />
                            </body>
                        </ProductProvider>
                    </CategoryProvider>
                </AuthProvider>
            </SocketProvider>
        </html>
    )
}
