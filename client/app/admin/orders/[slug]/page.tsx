"use client";

import AdminHeader from "@/components/AdminHeader";
import Loading from "@/components/Loading";
import { RootState } from "@/redux/store";
import { Order } from "@/types/order";
import { Binoculars, Copy } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<string>("Processing")

  const admin = useSelector((state: RootState) => state.user.admin)
  const orders = useSelector((state: RootState) => state.orders.adminOrders);

  const order = orders.find((ord: Order) => ord._id == slug);

  useEffect(() => {
    if (!admin) {
      router.push("/admin")
    } else if (!order) {
      router.push("/admin/orders")
    }
  }, [])

  if (!order) {
    return (
      <div className="pt-40">
        <AdminHeader/>
        
        <div className="flex-center flex-col text-gray-800">
          <Binoculars size={40} />
          <p className="font-outfit text-sm mt-4 text-center w-[80%]">Nothing here yet, Go back and browse our vast collection of products</p>
        </div>
      </div>
    )
  }

  const updateStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/order/${order._id}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        },
        credentials: "include",
        body: JSON.stringify({
          status: status
        })
      })

      const response = await res.json()

      if (!res.ok) {
        toast.error(response.message)
        return
      }

      toast.success(response.message)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const copyPhone = () => {
    navigator.clipboard.writeText(order.phone).
      then(() => toast.success("Phone Copied")).
      catch(() => toast.error("Failed to copy"))
  }

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
   <main className="pt-20 pb-30 px-4 sm:w-125 mx-auto">
      <AdminHeader />
      {loading && <Loading />}
      <Toaster />

      <div className="h-60 bg-gray-100">
        {/* image */}
        <img src={order.image} className="h-full w-full object-center object-cover" />
      </div>

      {/* category */}
      <p className="text-sm font-jsans-light mt-4">
        {order.category.toUpperCase()}
      </p>

      {/* name */}
      <p className="text-2xl font-jsans mt-2">{order.name}</p>

      {/* price */}
      <div className="mt-4">
        <p className="font-jsans text-lg font-bold">&#x20A6; {formatCurrency(order.price)}</p>
      </div>

      <div className="mt-8 px-2">
        <p className="font-jsans-light text-sm">QUANTITY</p>
        <p className="font-jsans text-sm mt-1">{order.quantity}</p>
      </div>

      <div className="mt-8 px-2">
        <p className="font-jsans-light text-sm">Scheduled Delivery Date</p>
        <p className="font-jsans text-sm mt-1">{order.deliveryDate}</p>
      </div>

      {/* customer details */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
        <h1 className="font-jsans">Customer Address</h1>

        <div className="font-jsans-light mt-4 text-sm ">
          <p>City: {order.location.city}</p>
          <p className="mt-3">Address: {order.location.address}</p>
          <p className="mt-3">Phone: {order.phone}</p>

          <div 
            onClick={copyPhone} 
            className="flex-start gap-2 bg-indigo-200 text-indigo-950 cursor-pointer w-20 rounded-xl py-2 px-3 text-[12px] mt-8"
          >
            <Copy size={14} />
            <span>Copy</span>
          </div>
        </div>
      </div>

      <form onSubmit={updateStatus} className="font-jsans mt-10">
        <h1 className="mb-4">Update Status</h1>
        <select 
          id="status"
          className="w-full block p-3 border border-gray-100 rounded-xl font-jsans-light"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Processing">Processing</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button className="btn-primary py-3 w-full mt-6 font-jsans rounded-xl">Update</button>
      </form>
   </main>
  )
}

export default OrderPage