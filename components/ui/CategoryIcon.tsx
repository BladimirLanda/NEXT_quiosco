//COMPONENT CATEGORY ICON
"use client"
import Image from "next/image"
import Link from "next/link"
import { Category } from "@prisma/client"
import { useParams } from "next/navigation"

/*
Image
Es un componente integrado en Next.js que permite renderizar imágenes de manera optimizada, 
proporcionando mejoras automáticas en el rendimiento, el tamaño, el formato y la carga 
progresiva de las imágenes utilizadas en una aplicación.
    <Image
    src="/ruta/a/la/imagen.jpg"
    alt="Descripción de la imagen"
    width={300}
    height={200}
    priority     *opcional: precarga esta imagen
    />
-fill
"Haz que esta imagen ocupe el tamaño completo del contenedor padre usando 
position: absolute y expandiéndose al 100% de alto y ancho"
    -La imagen se posiciona absolutamente (position: absolute)
    -Ocupa todo el espacio disponible de su contenedor 
    (que debe tener position: relative y un tamaño definido)
    -Es ideal para imágenes de fondo, avatars o thumbnails que deben 
    ajustarse al espacio del contenedor

Link
Es un componente integrado en Next.js que permite crear enlaces de navegación interna 
entre páginas de la aplicación, mejorando el rendimiento mediante técnicas como 
precarga automática de páginas y navegación sin recargar todo el documento.
    <Link href="/productos">
        Ir a Productos
    </Link>

useParams
Es un hook de Next.js para obtener los parámetros dinámicos de la URL en client components.
    /order/[category]
    /order/galletas
Entonces con useParams se puede obtener { category: 'galletas' } dentro de un componente cliente.
    -Solo funciona en ClientComponents
    -Devuelve un objeto con los parámetros dinámicos definidos en las carpetas [param]
    -Todos los valores vienen como string

Routing Dinámico
Es la capacidad de Next.js para generar rutas a partir de valores dinámicos (variables) 
en la URL, usando archivos entre corchetes [] en la estructura de carpetas.
En lugar de crear un archivo por cada ruta posible, se crea un archivo dinámico 
que recibe un valor desde la URL.

    URL's:
    /productos/1  
    /productos/2  
    /productos/3

    Página dinámica:
    /app/productos/[id]/page.tsx

    -El nombre dentro de [] es la variable que captura el valor de la URL.
    -Next la pasa a través de un hook llamado useParams.
*/

//Type
type CategoryIconProps = {
    category: Category
}

function CategoryIcon( { category } : CategoryIconProps) {
    //Params
    //useParams(): Uso en componente de cliente
    const params = useParams<{category: string}>();

    //---VIEW---//
    return (
        <div className={`w-full p-3 border-t flex items-center gap-4 
        border-gray-400 last-of-type:border-b 
        ${category.slug === params.category ? 'bg-amber-400' : ''}`}>
            <div className="w-16 h-16 relative">
                <Image 
                fill
                src={`/icon_${category.slug}.svg`} 
                alt={`img_${category.name}`} 
                />
            </div>

            <Link 
            href={`/order/${category.slug}`}
            className="text-xl font-bold"
            >
                {category.name}
            </Link>
        </div>
    )
}

export default CategoryIcon;