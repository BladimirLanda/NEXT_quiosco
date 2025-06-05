//PAGE PRODUCTS
import { redirect } from "next/navigation"
import ProductsPagination from "@/components/products/ProductsPagination"
import ProductTable from "@/components/products/ProductsTable"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import ProductSearchForm from "@/components/products/ProductSearchForm"

//CONSULTA DB
async function productsCount() {
    //.count(): Se usa para contar la cantidad de registros que existen en una tabla
    return await prisma.product.count();
}

//CONSULTA DB
async function getProducts(page: number, pageSize: number) {
    //Paginación
    const skip = (page - 1) * pageSize;

    //DB
    const products = await prisma.product.findMany({
        take: pageSize, //Define cuántos registros se quieren obtener.
        skip, //Define cuántos registros se van a ignorar (saltar).
        include: {
            category: true
        }
    });

    return products;
}

/*
searchParams
En Next 13+ con App Router, searchParams es un prop que reciben los componentes de página 
(page.tsx) y contiene los parámetros de la query string de la URL.
Es decir — todo lo que está después del ? en la URL.

    http://localhost:3000/products?category=snacks&page=2
    -searchParams.category = snacks
    -searchParams.page = 2

*/
async function ProductsPage( { searchParams } : { searchParams: Promise<{ page: string }> } ) {
    //Params
    const getPage = (await searchParams).page;

    //Paginación
    const page = +getPage || 1;
    const pageSize = 10;

    //Validación(-)
    if(page < 1) redirect('/admin/products');

    //Prisma
    const productsData = getProducts(page, pageSize);
    const totalProductData = productsCount();
    const [ products, totalProducts ] = await Promise.all([productsData, totalProductData]);

    //Paginación
    const totalPages = Math.ceil(totalProducts / pageSize);

     //Validación(+)
    if(page > totalPages) redirect('/admin/products');

    //---VIEW---//
    return (
        <>
            <Heading>Adminstrar Productos</Heading>

            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                <Link href={'/admin/products/new'}
                className="w-full px-10 py-3 text-center font-bold text-xl bg-amber-400 
                cursor-pointer lg:w-auto hover:shadow-sm">
                    Crear Producto
                </Link>

                <ProductSearchForm />
            </div>

            <ProductTable products={products} />

            <ProductsPagination page={page} totalPages={totalPages} />
        </>
    )
}

export default ProductsPage;