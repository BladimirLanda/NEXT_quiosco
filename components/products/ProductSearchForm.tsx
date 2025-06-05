//COMPONENT PRODUCT SEARCH FORM
"use client"
import { toast } from "react-toastify"
import { SearchSchema } from "@/src/schema"
import { useRouter } from "next/navigation"

/*
useRouter
Es un React hook proporcionado por Next.js que permite interactuar 
con el enrutador desde componentes cliente. Sirve para:

    -Navegar programáticamente (cambiar de página sin click en <Link>)
    -Reemplazar rutas
    -Refrescar la ruta actual
    -Acceder a info de la navegación

Se usa solo en Client Components (aquellos que empiezan con "use client").

    // Navegar a una ruta
    router.push("/productos");

    // Reemplazar la ruta actual (sin guardar en el historial)
    router.replace("/productos");

    // Refrescar la página actual (ideal si quieres revalidar datos)
    router.refresh();

En cliente → usa useRouter().push()
En servidor → usa redirect()
*/
function ProductSearchForm() {
    //Router
    const router = useRouter();

    //Actions
    const handleSearchForm = (formData : FormData) => {
        const data = {
            search: formData.get('search')
        }

        const result = SearchSchema.safeParse(data);

        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message);
            });

            return;
        }

        router.push(`/admin/products/search?search=${result.data.search}`);
    }

    //---VIEW---//
    return (
        <form action={handleSearchForm} 
        className="flex items-center">
            <input 
                type="text"
                name="search"
                placeholder="Buscar Producto"
                className="w-full p-2 placeholder-gray-400 bg-white"
            />

            <input 
                type="submit" 
                value={'Buscar'}
                className="p-2 uppercase text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
            />
        </form>
  )
}

export default ProductSearchForm;