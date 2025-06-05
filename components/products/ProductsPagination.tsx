//COMPONENT PRODUCTS PAGINATION
import Link from "next/link"

//Type
type ProductsPaginationProps = {
    page: number,
    totalPages: number
}

function ProductsPagination( { page, totalPages } : ProductsPaginationProps) {
    /*    
    Crea un array de números consecutivos desde 1 hasta totalPages.
    -Array.from({ length: totalPages })
    Crea un array vacío con totalPages posiciones.

    -(_, i)
    La función de mapeo recibe dos argumentos: el valor 
    actual (_, que no se usa) y el índice i.    

    -i + 1
    Como los índices de un array empiezan en 0, se le 
    suma 1 para que las páginas empiecen en 1	                            .
    */
    //Paginación
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    //---VIEW---//
    return (
        <nav className="py-10 flex justify-center">
            { page > 1 &&
            <Link href={`/admin/products?page=${page - 1}`}
            className="px-4 py-2 text-sm font-bold text-gray-900 bg-gray-200 ring-1 ring-inset
            ring-gray-300 focus:z-20 focus:outline-offset-0">
                &laquo;
            </Link> }

            { pages.map(currentPage => (
                <Link key={currentPage} href={`/admin/products?page=${currentPage}`}
                className={`${page === currentPage ? 'font-black bg-amber-100' : 'bg-white'} px-4 py-2 
                text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}>
                    {currentPage}
                </Link>
            )) }

            { page < totalPages &&
            <Link href={`/admin/products?page=${page + 1}`}
            className="px-4 py-2 text-sm font-bold text-gray-900 bg-gray-200 ring-1 ring-inset
            ring-gray-300 focus:z-20 focus:outline-offset-0">
                &raquo;
            </Link> }


        </nav>
    )
}

export default ProductsPagination;