//COMPONENT ORDER SUMMARY
"use client" //Los componentes hijos serán del Client
import { useMemo } from "react"
import { toast } from "react-toastify"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"

function OrderSummary() {
    //State
    //Zustand: Uso en componente de cliente
    //const { order, addToOrder } = useStore(); // ❌ más propenso a renders innecesarios
    const order = useStore((state) => state.order); // ✅ renderiza solo si order cambia
    const clearOrder = useStore((state) => state.clearOrder);

    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order]);

    /*
    formData
    Este objeto contiene todos los campos del formulario que se envió.
    Next convierte los valores del form en un FormData.

    FormData (import { FormData } from "next/server")
    Es una clase nativa de JavaScript que permite leer y manipular los 
    datos de un formulario HTML de sencilla, especialmente cuando 
    se manejan desde el servidor.

    .get()
    Se pueden obtener los valores de los campos por nombre usando .get()
    Siempre devuelve FormDataEntryValue | null (que puede ser string o File si es un input file), 
    por eso conviene castearlo o validarlo mediante un esquema.
    */
    //Actions
    const handleCreateOrder = async (formData : FormData) => {
        const data = {
            name: formData.get('name'),
            total,
            order
        }

        const result = OrderSchema.safeParse(data);

        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message);
            });

            return;
        }

        //server
        const response = await createOrder(data);

        if(response?.errors) {
            response.errors.forEach(error => {
                toast.error(error.message + " (server)");
            });

            return;
        }

        toast.success('Pedido realizo correctamente');
        clearOrder();
    }

    //---VIEW---//
    return (
        <aside className="p-5 md:w-64 lg:w-96 lg:h-screen lg:overflow-y-scroll">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

            {order.length === 0 
                ? <p className="my-10 text-center">El pedido está vacio</p>
                : (
                    <div className="mt-5">
                        {order.map(item => (
                            <ProductDetails key={item.id} item={item} />
                        ))}
                        
                        <p className="text-2xl mt-20 inline-block">
                            Total a pagar: {' '}
                            <span className="font-bold">{ formatCurrency(total) }</span>
                        </p>

                        <form 
                        className="w-full mt-10 space-y-5"
                        action={handleCreateOrder}
                        >
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Tu nombre"
                                className="w-full p-2 border font-semibold border-gray-100 bg-white"
                            />

                            <input 
                                type="submit"
                                value="Confirmar Pedido"
                                className="w-full py-2 rounded uppercase text-center font-bold
                                text-white bg-black cursor-pointer hover:opacity-80" 
                            />
                        </form>
                    </div>
                )
            }
        </aside>
    )
}

export default OrderSummary;