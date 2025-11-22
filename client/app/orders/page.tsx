"use client";

import Header from "@/components/Header"
import OrderItemDisplay from "@/components/OrderItemDisplay"
import { useFetchOrders } from "@/hooks/useFetchOrders"
import { useFetchUser } from "@/hooks/useFetchUser";
import { RootState } from "@/redux/store"
import { Order } from "@/types/order"
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux"

const Orders = () => {
  const {} = useFetchUser()
  const { isLoading } = useFetchOrders()
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.profile);
  const orders = useSelector((state: RootState) => state.orders.orders);

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex-center mt-20">
        <LoaderCircle className="animat-spin" />
      </div>
    )
  }

  return (
    <main className="py-20 bg-gray-50 px-4 min-h-screen">
      <Header />

      <h1 className="font-jsans text-2xl mt-2">My Orders</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {orders.map((order: Order) => <OrderItemDisplay key={order._id} order={order} />)}
      </section>
    </main>
  )
}

export default Orders