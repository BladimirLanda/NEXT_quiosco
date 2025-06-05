//COMPONENT PRODUCTS TABLE
import { formatCurrency } from "@/src/utils"
import Link from "next/link"
import { ProductWithCategory } from "@/src/types"

/*
1) sr-only
La clase sr-only (abreviatura de screen reader only) es una utilidad de Tailwind CSS 
que oculta visualmente un elemento en pantalla, pero lo mantiene accesible para los 
lectores de pantalla.

Es decir, ese <span> con la clase sr-only no se ve en la UI, pero los dispositivos de 
asistencia (como lectores de pantalla para personas con discapacidad visual) sí lo 
detectan y leen su contenido.

📌 ¿Para qué se usa?
Se utiliza mucho en tablas, botones o enlaces donde hay acciones visuales representadas 
por íconos o elementos no textuales, para proporcionar un texto descriptivo accesible 
para usuarios que dependen de tecnologías de asistencia.

    <th scope="col">
        <span className="sr-only">Acciones</span>
    </th>

Visualmente no muestra nada en pantalla.
Pero un lector de pantalla sí lo leerá como “Acciones” cuando pase por esa columna, 
ayudando a contextualizar el contenido.

2) scope
El atributo scope en una celda de tabla (<th>) se usa para definir a qué parte de la 
tabla aplica ese encabezado, ayudando tanto al navegador como a los lectores de 
pantalla a interpretar correctamente la estructura de la tabla.

📌 Valores posibles de scope
    -col → El encabezado aplica a toda la columna debajo de esa celda.
    -row → El encabezado aplica a toda la fila a la derecha de esa celda.
    -colgroup y rowgroup → Para grupos de columnas o filas (menos usados, pero existen).

    <th scope="col">Producto</th>

Significa que "Producto" es el encabezado de esa columna.
Todos los <td> que están en la misma columna estarán bajo ese encabezado semánticamente, 
lo cual es importante para accesibilidad (a11y) y para que tecnologías de asistencia 
lean bien la tabla.
*/

//Type
type ProductTableProps = {
    products: ProductWithCategory[]
}

function ProductTable( { products } : ProductTableProps ) {
    //---VIEW---// //*Gist*//
    return (
        <div className="mt-20 px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full p-5 py-2 align-middle sm:px-6 lg:px-8 bg-white">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm 
                                    font-semibold text-gray-900 sm:pl-0">
                                        Producto
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm 
                                    font-semibold text-gray-900">
                                        Precio
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm 
                                    font-semibold text-gray-900">
                                        Categoría
                                    </th>

                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Acciones</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm 
                                        font-medium text-gray-900 sm:pl-0">
                                            {product.name}
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-4 text-sm 
                                        text-gray-500">
                                            { formatCurrency(product.price) }
                                        </td> 

                                        <td className="whitespace-nowrap px-3 py-4 text-sm 
                                        text-gray-500">
                                            {product.category.name}
                                        </td>

                                        <td className="relative whitespace-nowrap py-4 pl-3 
                                        pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Link href={`/admin/products/${product.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-800">
                                                Editar <span className="sr-only">, {product.name}</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductTable;