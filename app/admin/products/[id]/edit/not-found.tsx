//PAGE PRODUCTS EDIT 404

import Heading from "@/components/ui/Heading";
import Link from "next/link";

function NotFound() {
    //---VIEW---//
    return (
        <div className="flex flex-col items-center text-center">
            <Heading>Producto no encontrado 😢</Heading>

            <Link href={'/admin/products'}
            className="w-full px-10 py-3 text-xl text-center font-bold 
            bg-amber-400 text-black cursor-pointer md:w-auto hover:bg-amber-500">
                Ir a Productos
            </Link>
        </div>
    )
}

export default NotFound;