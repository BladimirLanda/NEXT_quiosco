//API SWR
import { prisma } from "@/src/lib/prisma"

/*
API NEXT
Cuando en Next.js App Router (en /app) creas una carpeta /api, y dentro 
un archivo por ejemplo:
    app/
        orders/
            api/
                route.ts
Se está creando una API Route que puede manejar peticiones HTTP como un mini 
backend dentro de tu proyecto Next.

Cada método que se define como función exportada en route.ts corresponde 
al método HTTP con el mismo nombre.
    GET -> para obtener datos
    POST -> para crear un nuevo recurso
    PUT -> para actualizar
    DELETE -> para eliminar
Cada función responde solo al método HTTP con su mismo nombre.

El retorno tiene la estructura: Response.json(data)

Cuando desde el frontend se hace un fetch a /api/orders, Next sabe qué 
función usar según el método:
    //GET 
    fetch('/orders/api')
*/

/*
SWR (stale-while-revalidate) - SWR es client-side - npm i swr
Es una librería de React (y súper usada en Next.js) creada por Vercel para 
hacer fetch de datos de manera eficiente, rápida y con cacheo optimizado.

El nombre viene de una estrategia de cacheo:
"Stale-While-Revalidate", que significa:
    -Entregar datos desde caché instantáneamente (stale = viejo)
    -Mientras en segundo plano (while) hace un fetch para obtener 
    los datos actualizados (revalidate)
*/

/*
include
Cuando se hace una consulta con Prisma, include permite incluir relaciones 
relacionadas con el modelo principal dentro de la misma consulta.
👉 Es como hacer un JOIN en SQL, pero en formato objeto.

En este caso:
-Primero obtiene todas las orders donde status es false.
-Incluye el array orderProducts (la relación que tenga 
el modelo order con orderProducts).
-Incluye el array orderProducts (la relación que tenga 
el modelo order con orderProducts).
*/
export const dynamic = 'force-dynamic';

export async function GET() {
  //CONSULTA DB
  const orders = await prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  });
  
  return Response.json(orders);
}