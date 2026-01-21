"use client";

import Header from "@/components/Header"
import Loading from "@/components/Loading";
import OrderItemDisplay from "@/components/OrderItemDisplay"
import { useFetchOrders } from "@/hooks/useFetchOrders"
import { useFetchUser } from "@/hooks/useFetchUser";
import { RootState } from "@/redux/store"
import { Order } from "@/types/order"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux"

const Orders = () => {
  const { isLoading } = useFetchUser()
  const {} = useFetchOrders()
  const [orderStatus, setOrderStatus] = useState<string>("Processing")
  const [navbarActive, setNavbarActive] = useState<boolean>(false)
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.profile);
  const ordersRaw = useSelector((state: RootState) => state.orders.orders);

  const orders = [...ordersRaw].reverse();
  const filteredOrders = orders.filter(ord => ord.status === orderStatus);

  if (isLoading) return <Loading />

  if (!user) {
    router.push("/signin")
  }

  // if (isLoading) {
  //   return (
  //     <div className="flex-center mt-20">
  //       <LoaderCircle className="animate-spin" />
  //     </div>
  //   )
  // }

  return (
    <main className="py-20 bg-gray-50 px-4 min-h-screen">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />

      <h1 className="font-jsans text-center text-2xl mt-2">My Orders</h1>

      {/* tab */}
      <div
        className="w-[95%] mt-10 sm:w-[500px] mx-auto flex-between p-1 gap-2 rounded-full bg-gray-100"
      >
        <div
          onClick={() => setOrderStatus("Processing")} 
          className={`${orderStatus === "Processing" ? "bg-white" : ""} p-3 rounded-full cursor-pointer text-sm text-center w-full`}
          >
          Processing
        </div>
        <div 
          onClick={() => setOrderStatus("Delivered")}
          className={`${orderStatus === "Delivered" ? "bg-white" : ""} p-3 rounded-full cursor-pointer text-sm text-center w-full`}
        >
          Delivered
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 sm:px-10">
        {filteredOrders.map((order: Order) => <OrderItemDisplay key={order._id} order={order} />)}
      </section>
    </main>
  )
}

export default Orders