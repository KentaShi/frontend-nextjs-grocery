import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"
import React from "react"

const AdminLayout = ({ children }) => {
    return (
        <main className="relative">
            <AdminNavbar />
            <div className="flex">
                <AdminSidebar />
                <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                    <div className="w-full">{children}</div>
                </section>
            </div>
        </main>
    )
}

export default AdminLayout
