"use client";

import AdminHeader from "@/components/AdminHeader"
import AdminOrderItemDisplay from "@/components/AdminOrderItemDisplay"
import { useFetchAdmin } from "@/hooks/useFetchAdmin";
import { useFetchAdminOrders } from "@/hooks/useFetchAdminOrders"
import { RootState } from "@/redux/store"
import { Order } from "@/types/order"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux"

const Orders = () => {
  const {} = useFetchAdmin()
  const {} = useFetchAdminOrders()
  const router = useRouter()

  const admin = useSelector((state: RootState) => state.user.admin)
  const ordersRaw = useSelector((state: RootState) => state.orders.adminOrders);

  const orders = [...ordersRaw].reverse();

  useEffect(() => {
    if (!admin) {
      router.push("/admin")
    }
  }, [])

  return (
    <main className="py-20 px-4 min-h-screen bg-gray-50">
      <AdminHeader />

      <h1 className="text-xl text-xl font-jsans">Recent Orders</h1>

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orders.map((order: Order) => {
          return (
            <AdminOrderItemDisplay key={order._id} order={order} />
          )
        })}
      </section>

    </main>
  )
}

export default Orders