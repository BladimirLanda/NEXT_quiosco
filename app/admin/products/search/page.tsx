//PAGE PRODUCTS SEARCH
import ProductSearchForm from "@/components/products/ProductSearchForm"
import ProductTable from "@/components/products/ProductsTable"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"

//CONSULTA DB
async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm, //Contiene una cadena de String
                mode: 'insensitive' //Ignora la capitalización
            }
        },
        include: {
            category: true
        }
    });

    return products;
}

async function SearchPage( { searchParams } : { searchParams: Promise<{search: string}> } ) {
    //Params
    const getSearch = (await searchParams).search;

    //Prisma
    const products = await searchProducts(getSearch);

    //---VIEW---//
    return (
        <>
            <Heading>Resultados de búsqueda: {getSearch}</Heading>

            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                <Link href={'/admin/products'}
                className="w-full px-10 py-3 text-center font-bold text-xl bg-amber-400 
                cursor-pointer lg:w-auto hover:shadow-sm">
                    Limpiar Busqueda
                </Link>

                <ProductSearchForm />
            </div>

            {products.length ? (
                <ProductTable products={products} />
            ) :
                <p className="text-center text-lg">No hay resultados</p>
            }
        </>
    )
}

export default SearchPage;