"use client";

import { Order } from "@/types/order"
import { useRouter } from "next/navigation"

const AdminOrderItemDisplay = ({ order }: { order: Order }) => {
  const router = useRouter()

  const toOrder = () => {
    router.push(`/admin/orders/${order._id}`)
  }

  return (
    <div className="bg-white p-4 border-1 border-gray-200 rounded-lg">

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
            className={`${order.status == "Processing" ? "bg-yellow-200 text-yellow-950" : "bg-green-200 text-green-950"} font-jsans text-[12px] py-1 px-3 mt-1 rounded-full`}
          >
            {order.status}
          </p>
        </div>

        <div>
          <p className="font-jsans-light text-[12px]">Scheduled Date</p>
          <p className="
          font-jsans text-sm mt-1">{order.deliveryDate}</p>
        </div>
      </div>

      <div className="mt-6 px-2 font-jsans">
        <p className="font-jsans-light text-[12px]">CUSTOMER DETAILS</p>

        <div className="mt-4 bg-gray-100 rounded-lg text-sm p-4 border-1 border-gray-200">
          <p className="font-jsans-light text-sm break-words mt-2">City:  <span className="font-jsans">{order.location.city}</span></p>

          <p className="font-jsans-light text-sm break-words mt-2">Address:  <span className="font-jsans">{order.location.address}</span></p>

          <p className="font-jsans-light text-sm break-words mt-2">Phone:  <span className="font-jsans">{order.phone}</span></p>
        </div>
      </div>

      <button 
        onClick={toOrder} 
        className="btn-primary text-sm font-jsans py-2 w-full rounded-lg mt-6"
      >
        View
      </button>
    </div>
  )
}

export default AdminOrderItemDisplay