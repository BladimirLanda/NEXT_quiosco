//COMPONENT EDIT PRODUCT FORM
"use client"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { updateProduct } from "@/actions/update-product-action";
import { ProductSchema } from "@/src/schema"
import { toast } from "react-toastify"

function EditProductForm( {children} : {children : React.ReactNode} ) {
    //Params
    const params = useParams();
    const id = +params.id!;

    //Router
    const router = useRouter();

    //Actions
    const handleSubmit = async (formData : FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }

        const result = ProductSchema.safeParse(data);

        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message);
            });

            return;
        }

        //server
        const response = await updateProduct(data, id);

        if(response?.errors) {
            response.errors.forEach(error => {
                toast.error(error.message + " (server)");
            });

            return;
        }

        toast.success('Producto actualizado correctamente');
        router.push('/admin/products');
    }

    //---VIEW---//
    return (
        <div className="max-w-3xl mx-auto mt-10 px-5 py-10 rounded-md shadow-md bg-white">
            <form action={handleSubmit}
            className="space-y-5">

                {children}

                <input 
                    type="submit" 
                    value="Guardar Cambios"
                    className="w-full mt-5 p-3 uppercase font-bold text-white 
                    bg-indigo-600 hover:bg-indigo-800 cursor-pointer"
                />
            </form>
        </div>
    )
}

export default EditProductForm;