//ACTION CREATE ORDER
"use server"
import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema"
import { revalidatePath } from "next/cache";

/*
Server Actions
Los Server Actions son una nueva funcionalidad (Next 13+ con App Router) que permite 
ejecutar funciones asíncronas directamente en el servidor, desde componentes React 
(Client o Server) sin tener que armar APIs separadas en /api.

👉 En lugar de crear un endpoint API para hacer, por ejemplo, un insert a la base de datos, 
puedes definir una función marcada como server action y llamarla desde un formulario o 
una acción de cliente.
Next se encarga de mandar la petición al servidor, correr la Server Action y devolver 
la respuesta.

📦 ¿Cómo se declaran?
Componentes Server: Se coloca "use server" dentro de la función (no recomendado).
Componentes Client: Se genera la función en un archivo aparte.
*/

export async function createOrder(data : unknown) {
    const result = OrderSchema.safeParse(data);

    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        /*
        create() de Prisma se usa para insertar un nuevo registro en una tabla (modelo).
        En este caso:
            -Inserta un nuevo registro en la tabla Order
            - Crea registros relacionados en la tabla OrderProduct 
            usando la relación definida en el schema.prisma
            -Usa create dentro del objeto orderProducts para indicar quue se quiere 
            crear varios registros relacionados en esa tabla, al mismo tiempo.
        
        create({ data })	                                Crea un registro simple
        create({ data: { relation: { create: [...] }}})	    Crea registros relacionados en cascada
        create({ data: { relation: { connect: { id: X }}}})	Conecta a un registro existente en otra tabla
        */
        //CONSULTA DB
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}