//PAGE PRODUCTS/NEW
import AddProductForm from "@/components/products/AddProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading"

/*
Composición en React/Next
Es el patrón de pasar componentes hijos a través de las props children, 
para que un componente "contenedor" renderice o gestione lo que tenga dentro.

    -Un Client Component puede renderizar otros Client Components ✅
    -Un Server Component puede renderizar otros Server Components ✅
    -Pero un Client Component no puede renderizar directamente un Server Component ❌

Esto es porque los Server Components se procesan en el servidor antes de mandarse 
al cliente, y no se pueden "inyectar" dinámicamente desde un Client Component 
que vive ya en el navegador.

Con composición invertida:
El Client Component AddProductForm acepta children (que es lo que se le pasa desde su padre, 
que debe ser un Server Component).
Aquí, como CreateProductPage es Server Component, él compone AddProductForm con ProductForm 
desde el server antes de enviar al cliente, por lo que se respetan las reglas ✅.
*/
export const dynamic = 'force-dynamic';

function CreateProductPage() {
    //---VIEW---//
    return (
        <>
            <div className="flex flex-col items-start">
                <Heading>Nuevo Producto</Heading>

                <GoBackButton />
            </div>
            

            <AddProductForm>
                <ProductForm />
            </AddProductForm>
        </>
    )
}

export default CreateProductPage;