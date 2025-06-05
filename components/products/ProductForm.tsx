//COMPONENT PRODUCT FORM
import { prisma } from "@/src/lib/prisma"
import { Product } from "@prisma/client"
import ImageUpload from "./ImageUpload"

//Type
type ProductFormProps = {
    product?: Product
}

//CONSULTA DB
async function getCategories() {
    return await prisma.category.findMany();
}

/*
📌 Diferencia entre value y defaultValue en un <input>
-value Controlado
	El valor del input es controlado por React (state), 
    y solo puede cambiar si se actualiza el estado asociado.

-defaultValue No controlado
Establece el valor inicial cuando se renderiza el input por 
primera vez, pero después el input mantiene su valor de forma 
interna (como en HTML normal)

En este caso:
<input
  type="text"
  defaultValue={product?.name}
/>
✅ Coloca el nombre inicial, pero después el usuario puede editarlo 
libremente sin que React lo controle.:
*/
async function ProductForm( { product } : ProductFormProps ) {
    //Prisma
    const categories = await getCategories();

    //---VIEW---//
    return (
        <>
            <div className="space-y-2">
                <label htmlFor="name"
                className="text-slate-800">
                    Nombre:
                </label>

                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre Producto"
                    defaultValue={product?.name}
                    className="block w-full p-3 bg-slate-100"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="price"
                className="text-slate-800">
                    Precio:
                </label>

                <input
                    id="price"
                    name="price"
                    placeholder="Precio Producto"
                    defaultValue={product?.price}
                    className="block w-full p-3 bg-slate-100"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="categoryId"
                className="text-slate-800">
                    Categoría:
                </label>

                <select
                    id="categoryId"
                    name="categoryId"
                    defaultValue={product?.categoryId}
                    className="block w-full p-3 bg-slate-100"
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <ImageUpload image={product?.image} />
        </>
    )
}

export default ProductForm;