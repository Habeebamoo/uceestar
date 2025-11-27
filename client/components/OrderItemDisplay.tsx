import { Order } from "@/types/order"

const OrderItemDisplay = ({ order }: { order: Order }) => {
  return (
    <div className="bg-white p-6 border-1 border-gray-200 rounded-lg">

      <div className="flex-start gap-4">
        <div className="h-22 w-30 bg-gray-50">
          <img src={order.image} className="w-full h-full object-cover object-center" />
        </div>

        <div>
          <p className="font-jsans-light text-[12px]">{order.category.toUpperCase()}</p>
          <h1 className="font-jsans">{order.name}</h1>

          <div className="flex-start gap-2 text-[12px] mt-4">
            <p className="font-jsans">QUANTITY: </p>
            <p className="font-jsans-light">{order.quantity}</p>
          </div>
        </div>
      </div>

      <div className="px-2 flex-between mt-4">
        <div>
          <p className="font-jsans-light text-[12px]">STATUS</p>
          <p 
            className={`${order.status == "Processing" ? "bg-yellow-400" : "bg-green-400"} font-jsans text-[12px] py-1 px-3 mt-1 rounded-full`}
          >
            {order.status}
          </p>
        </div>

        <div>
          <p className="font-jsans-light text-[12px]">Delivery Date</p>
          <p className="
          font-jsans text-sm mt-1">{order.deliveryDate}</p>
        </div>
      </div>

    </div>
  )
}

export default OrderItemDisplay