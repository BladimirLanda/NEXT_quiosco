//Types
import { Product, Prisma } from '@prisma/client';

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number,
    subtotal: number
}

/*
Prisma.ModeloGetPayload
Es una utilidad de Prisma que permite generar el tipo TypeScript de lo que devuelve 
una consulta Prisma.
Sirve para inferir automáticamente el tipo de los datos que devuelve una consulta como 
findMany, findUnique, etc.

En este caso:
    -OrderWithProducts es el tipo que representa una orden con su arreglo de 
    orderProducts, y cada orderProduct con su product dentro.
*/
export type OrderWithProducts = Prisma.OrderGetPayload<{
    include: {
        orderProducts: { 
            include: { 
                product: true 
            } 
        }
    } 
}>;

export type ProductWithCategory = Prisma.ProductGetPayload<{
    include: {
        category: true
    }
}>;