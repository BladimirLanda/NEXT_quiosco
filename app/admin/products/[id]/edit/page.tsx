//PAGE EDIT PRODUCT
import { notFound } from "next/navigation"
import { prisma } from "@/src/lib/prisma"
import Heading from "@/components/ui/Heading"
import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"

//CONSULTA DB
async function getProductById (id : number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    });

    /*
    notFound();
    Es una función que se importa desde next/navigation y se usa 
    del lado del servidor para indicar que la página solicitada 
    no existe, es decir, que debería renderizarse la página 
    not-found.tsx que definas en esa ruta.

    Cuando se llama a notFound() dentro de una Server Component, 
    Next detiene el renderizado normal de la página y redirige 
    al usuario hacia la pantalla not-found correspondiente.
    */
    if(!product) {
        notFound();
    }

    return product;
}

async function EditProductPage( { params } : { params: Promise<{ id: string }> } ) {
    //Params
    const { id } = await params;

    //Prisma
    const product = await getProductById(+id);

    //---VIEW---//
    return (
        <>
            <div className="flex flex-col items-start">
                <Heading>
                    Editar Producto: <span className="text-white">{product.name}</span>
                </Heading>

                <GoBackButton />
            </div>

            <EditProductForm>
                <ProductForm product={product} />
            </EditProductForm>
        </>
    )
}

export default EditProductPage;