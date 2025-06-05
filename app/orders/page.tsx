//PAGE ORDERS
"use client"
import useSWR from "swr";
import Logo from "@/components/ui/Logo"
import { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "@/components/order/LatestOrderItem";

//SWR
const fetcher = (url: string) => fetch(url).then(res => res.json())

function OrdersPage() {
     //SWR
    const url = '/orders/api';
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, { 
        refreshInterval: 60000,
        revalidateOnFocus: false
    });

    if (isLoading) return <p>Cargando...</p>
    if (error) return <p>Error en carga de datos</p>

    //---VIEW---//
    if(data) return (
        <div className="px-2 md:px-0">
            <h1 className="max-w-5xl mx-auto mt-20 py-2 text-center text-4xl md:text-6xl 
            font-black rounded-2xl text-amber-500 bg-indigo-600">
                Ordenes Listas
            </h1>

            <Logo />

            {data.length ? (
                <div className="max-w-5xl mx-auto mt-10 grid grid-cols-2 gap-5">
                    {data.map(order => (
                        <LatestOrderItem key={order.id} order={order} />
                    ))}
                </div>
            ) : <p className="my-10 text-center">No hay ordenes listas</p> }
        </div>
    )
}

export default OrdersPage;