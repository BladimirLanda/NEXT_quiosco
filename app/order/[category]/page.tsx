//PAGE ORDER [CATEGORY]
import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

//CONSULTA DB
async function getProducts (category : string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: category
            }
        }
    });

    return products;
}

/*
params
En Next.js App Router, params es un prop que reciben los componentes de página (page.tsx) 
y contiene los segmentos dinámicos de la URL definidos en los nombres de los archivos 
o carpetas con corchetes [].

        app/
    └── product/
        └── [id]/
            └── page.tsx
    http://localhost:3000/product/42
    -params.id = 4
*/
async function OrderPage( { params } : { params: Promise<{ category: string }> } ) {
    //Params
    //{params} Disponible en ServerComponents (layout.tsx, page.tsx, route.tsx)
    const { category } = await params;

    //Prisma
    const products = await getProducts(category);
    
    //---VIEW---/
    return (
        <>
            <Heading>Elige y personaliza tu pedido</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-start gap-4">
                {products.map(product => (
                    <ProductCard key={product.id}  product={product} />
                ))}
            </div>
        </>
    )
}

export default OrderPage;