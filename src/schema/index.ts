//ZOD SCHEMAS 
import { z } from 'zod' //npm i zod

/*
Validaciones Zod
Zod es una librería de validación y parsing de datos para TypeScript y JavaScript, 
súper popular en stacks como Next.js porque permite definir schemas declarativos 
para validar estructuras de datos (objetos, strings, arrays, etc.) de forma limpia y typesafe.

Ejemplo:
    .min(1, 'Tu nombre es obligatorio')
    Valida que ese string tenga al menos 1 caracter.
    Si no lo tiene, lanza un mensaje de error personalizado.
*/
export const OrderSchema = z.object({
    name: z.string()
            .min(1, 'Tu nombre es obligatorio'),
    total: z.number()
            .min(1, 'Hay errores en la orden'),
    //OrderProducts
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))

});

export const SearchSchema = z.object({
    search: z.string()
                .trim()
                .min(1, 'La busqueda no puede ir vacia')
});

export const ProductSchema = z.object({
        name: z.string()
                .trim()
                .min(1, 'El Nombre del Producto no puede ir vacio'),
        price: z.string()
                .trim()
                .transform(value => parseFloat(value)) //Permite transformar el valor antes de validarlo
                .refine(value => value > 0, 'Precio no válido'), //Permite validar un valor personalizado después de haberlo transformado.
        categoryId: z.string()
                .trim()
                .transform(value => parseInt(value)) 
                .refine(value => value > 0, 'La Categoría es Obligatoria'),
        image: z.string()
                .min(1, 'La imagen es obligatoria')
});

export const UploadSuccessResultSchema = z.object({
        event: z.string(),
        info: z.object({
                secure_url: z.string()
        })
});

