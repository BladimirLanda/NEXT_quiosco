//COMPONENT ADD PRODUCT FORM
"use client"
import { createProduct } from "@/actions/create-product-action";
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function AddProductForm( {children} : {children : React.ReactNode} ) {
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
        const response = await createProduct(data);

        if(response?.errors) {
            response.errors.forEach(error => {
                toast.error(error.message + " (server)");
            });

            return;
        }

        toast.success('Producto registrado correctamente');
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
                    value="Registrar Producto"
                    className="w-full mt-5 p-3 uppercase font-bold text-white 
                    bg-indigo-600 hover:bg-indigo-800 cursor-pointer"
                />
            </form>
        </div>
    )
}

export default AddProductForm;