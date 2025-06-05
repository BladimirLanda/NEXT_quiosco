//LAYOUT ADMIN
import ToastNotification from "@/components/ui/ToastNotification"
import AdminSidebar from "@/components/admin/AdminSidebar";

async function AdminLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    //---VIEW---//
    return (
        <>
            <div className="md:flex">
                <aside className="md:w-72 md:h-screen bg-white">
                    <AdminSidebar />
                </aside>

                <main className="p-5 md:flex-1 md:h-screen md:overflow-y-scroll bg-gray-100">
                    {children}
                </main>
            </div>

            <ToastNotification />
        </>
    )
}

export default AdminLayout;