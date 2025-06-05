//COMPONENT LASTES ORDER ITEM
import { OrderWithProducts } from "@/src/types"

//Type
type LatestOrderItemProps = {
    order: OrderWithProducts
}

function LatestOrderItem( { order } : LatestOrderItemProps ) {
    //--VIEW---//
    return (
        <div className="p-5 space-y-5 shadow rounded-lg bg-white">
            <p className="text-xl font-bold text-slate-600">
                Cliente: {order.name}
            </p>

            <ul role="list"
            className="border-t border-gray-200 divide-y divide-gray-200 text-sm
            font-medium text-gray-500">
                {order.orderProducts.map(orderProduct => (
                    <li key={orderProduct.id} className="flex py-6 text-lg">
                        <p>
                            <span className="font-bold">( {orderProduct.quantity} ) {' '}</span>
                            {orderProduct.product.name}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LatestOrderItem