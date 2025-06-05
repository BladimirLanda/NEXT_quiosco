//COMPONENT PRODUCT CARD
import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

//Type
type ProductCardProps = {
    product: Product
}

function ProductCard( { product } :  ProductCardProps ) {
    //Ruta Imagen
    const imagePath = getImagePath(product.image);

    //---VIEW---//
    return (
        <div className="border border-gray-200 bg-white">
            <div className="flex md:block justify-center">
                <Image 
                    src={imagePath}
                    alt={`img_${product.name}`}
                    width={400}
                    height={500}
                    className="object-contain"
                />
            </div>

            <div className="p-5">
                <h3 className="text-3xl font-bold 
                break-words lg:text-xl xl:text-2xl">
                    {product.name}
                </h3>

                <p className="mt-5 font-black text-4xl text-amber-500 
                break-words lg:text-xl xl:text-3xl">
                    { formatCurrency(product.price) }
                </p>

                <AddProductButton  product={product} />
            </div>
        </div>
    )
}

export default ProductCard;