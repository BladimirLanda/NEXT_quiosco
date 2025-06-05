//COMPONETN ADD PRODUCT BUTTON
"use client"
import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

//Type
type AddProductButtonProps = {
    product: Product
}

function AddProductButton( { product } : AddProductButtonProps ) {
    //State
    const addToOrder = useStore((state) => state.addToOrder);

    //---VIEW---//
    return (
        <button
        type="button"
        className="w-full mt-5 p-3 uppercase font-bold cursor-pointer
        text-white bg-indigo-600 hover:bg-indigo-800"
        onClick={ () => addToOrder(product) }
        >
            Agregar
        </button>
    )
}

export default AddProductButton