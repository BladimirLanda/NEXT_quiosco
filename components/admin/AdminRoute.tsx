//COMPONENT ADMIN ROUTE
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

//Type
type AdminRouteProps = {
    link: {
        url: string,
        text: string,
        blank: boolean
    }
}

/*
usePathname
Es un custom hook de Next.js que permite obtener la ruta actual (pathname) 
en la que se encuentra el usuario dentro de la aplicación.
Devuelve un string con la ruta actual, por ejemplo:

    Si estás en /order/galletas
    → usePathname() devuelve "/order/galletas"

Solo funciona en componentes client-side (por eso lleva "use client" arriba).
No devuelve query params ni hash, solo el path limpio.
*/

function AdminRoute( { link } : AdminRouteProps ) {
    //Navigation
    //usePathname(): Uso en componente de cliente
    const pathname = usePathname();
    const isActive = pathname.startsWith(link.url);

    //---VIEW---//
    return (
        <Link href={link.url} 
        target={link.blank ? "_blank" : ''}
        className={`${isActive ? 'bg-amber-400' : 'hover:bg-amber-50'} p-3 font-bold text-lg 
        border-t border-gray-200 last-of-type:border-b `}>
            {link.text}
        </Link>
    )
}

export default AdminRoute