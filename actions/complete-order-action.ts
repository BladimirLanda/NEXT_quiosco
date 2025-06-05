//ACTION COMPLETE ORDER
"use server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/src/lib/prisma"

export async function completeOrder(formData : FormData) {
    const orderId = formData.get('order_id')!;

    try {
        /*
        update() de Prisma sirve para modificar un registro existente en la base de datos.
        Debe especificarse:
            -dónde está el registro (where)
            -qué campos se van a actualizar (data)
        */
       //CONSULTA DB
        await prisma.order.update({
            where: {
                id: +orderId
            },
            data: {
                status: true,
                orderReadyAt: new Date(Date.now())
            }
        });

        /*
        revalidatePath()
        Es una función de Server Actions (o de cualquier código server-side) que 
        fuerza la revalidación del caché de una ruta específica.

            🚀 ¿Por qué?
            Cuando en Next.js usas fetch con caché, o tienes páginas estáticas 
            generadas con ISR (Incremental Static Regeneration), los datos no 
            se actualizan automáticamente a menos que se indique.
            Con revalidatePath() le dices a Next:
            "Hey, vuelve a generar el caché de esta ruta la próxima vez que alguien 
            la visite, porque acabo de actualizar datos importantes."

            En este caso:
            "Cuando alguien visite /admin/orders, vuelve a generar esa vista (server-side), 
            para que no muestre el caché viejo y vea las órdenes actualizadas."

            Combinando con Server Action, Next automáticamente refresca la ruta actual 
        */
        revalidatePath('/admin/orders');
    } catch (error) {
        console.log(error);
    }
}