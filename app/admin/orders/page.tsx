//PAGE ORDERS
"use client"
import useSWR from 'swr'
import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import { OrderWithProducts } from '@/src/types'

/*
fetcher
Es una función que indica cómo se deben obtener los datos 
desde la URL que se le pase.
En este caso usa fetch y lo convierte en JSON.

URL
Es la clave (key) que se usa para identificar la solicitud en cache y para hacer el fetch.
  -endpoint para llamar a la API
  -key única para el caché de SWR

useSWR(url, fetcher, configuración)
Es el hook principal de la librería SWR que:
  -Hace el fetch usando el fetcher
  -Cachea los datos
  -Devuelve un objeto con:
    -data (cuando llegan los datos)
    -error (si hubo un fallo)
    -isLoading (mientras espera los datos)
  -{ refreshInterval: milisegundos }: fetch automático cada X milisegundos
    siempre y cuando el componente esté montado y la pestaña visible.
  -{ revalidateOnFocus: boolean }: fetch cada que se visite la página
*/
//SWR
const fetcher = (url: string) => fetch(url).then(res => res.json())

function OrdersPage() {
 //SWR
  const url = '/admin/orders/api';
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, { 
    refreshInterval: 60000,
    revalidateOnFocus: false
  });

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error en carga de datos</p>


  //---VIEW---//
  if (data) return (
    <>
        <Heading>Administrar Ordenes</Heading>

        {data.length ? (
          <div className='mt-5 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5'>
            {data.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : <p className='text-center'>No hay ordenes pendientes</p>}
    </>
  )
}

export default OrdersPage;