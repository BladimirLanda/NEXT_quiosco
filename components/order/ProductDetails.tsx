//COMPONENT PRODUCT DETAILS
import { XCircleIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline' //npm i @heroicons/react
import { OrderItem } from "@/src/types"
import { formatCurrency } from '@/src/utils'
import { useStore } from '@/src/store'
import { useMemo } from 'react'

//Type
type ProductDetailsProps = {
    item: OrderItem
}

//Consts
const MAX_ITEMS = 5;

function ProductDetails( { item } : ProductDetailsProps ) {
    //State
    const increaseQuantity = useStore((state) => state.increaseQuantity);
    const decreaseQuantity = useStore((state) => state.decreaseQuantity);
    const removeItem = useStore((state) => state.removeItem);

    const disabledDecreaseButton = useMemo(() => item.quantity === 1, [item]);
    const disabledIncreaseButton = useMemo(() => item.quantity === MAX_ITEMS, [item]);

    //---VIEW---//
    return (
        <div className="p-4 shadow space-y-1 bg-white border-t border-gray-200">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">
                        {item.name} 
                    </p>

                    <button
                    type="button"
                    className='cursor-pointer'
                    onClick={() => removeItem(item.id)}
                    >
                        <XCircleIcon className="text-red-600 h-8 w-8"/>
                    </button>
                </div>

                <p className="text-2xl text-amber-500 font-black">
                    { formatCurrency(item.price) }
                </p>

                <div className="w-fit px-10 py-2 flex gap-5 bg-gray-100 rounded-lg">
                    <button
                    type="button"
                    className='cursor-pointer disabled:opacity-20 disabled:cursor-auto'
                    disabled={disabledDecreaseButton}
                    onClick={() => decreaseQuantity(item.id)}
                    >
                        <MinusIcon className="h-6 w-6"/>
                    </button>

                    <p className="text-lg font-black ">
                        {item.quantity}
                    </p>

                    <button
                    type="button"
                    className='cursor-pointer disabled:opacity-20 disabled:cursor-auto'
                    disabled={disabledIncreaseButton}
                    onClick={() => increaseQuantity(item.id)}
                    >
                        <PlusIcon className="h-6 w-6"/>
                    </button>
                </div>

                <p className="text-xl font-black text-gray-700">
                    Subtotal: {''}
                    <span className="font-normal"> 
                        { formatCurrency(item.subtotal) }
                    </span>
                </p>
            </div>
        </div>
    )
}

export default ProductDetails