//LAYOUT ORDER
import OrderSideBar from "@/components/order/OrderSideBar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";

function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    //---VIEW---//
    return (
        <>
            <div className="md:flex">
                <OrderSideBar />

                <main className="p-5 md:flex-1 md:h-screen md:overflow-y-scroll">
                    { children }
                </main>

                <OrderSummary />
            </div>

            <ToastNotification />
        </>
    )
}

export default RootLayout;