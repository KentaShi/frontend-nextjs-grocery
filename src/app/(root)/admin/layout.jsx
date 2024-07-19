import AdminNavbar from "@/components/admin/AdminNavbar"
import AdminSidebar from "@/components/admin/AdminSidebar"
import React from "react"

const AdminLayout = ({ children }) => {
    return (
        <main className="relative">
            <AdminNavbar />
            <div className="flex">
                <AdminSidebar />
                <section className="flex bg-dark-1 min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                    <div className="w-full">{children}</div>
                </section>
            </div>
        </main>
    )
}

export default AdminLayout
