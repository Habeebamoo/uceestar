"use client";

import AdminHeader from "@/components/AdminHeader"
import { useFetchAdmin } from "@/hooks/useFetchAdmin"
import { useFetchAdminDashboard } from "@/hooks/useFetchAdminDashboard";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { RootState } from "@/redux/store";
import { Order } from "@/types/order";
import { User } from "@/types/user";
import { HandCoins, ShoppingBagIcon, ShoppingCart, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const {} = useFetchAdmin();
  const {} = useFetchAdminDashboard();
  const {} = useFetchUsers();
  const router = useRouter();

  const admin = useSelector((state: RootState) => state.user.admin);
  const dashboard = useSelector((state: RootState) => state.user.adminDashboard);
  const users = useSelector((state: RootState) => state.user.users);
  const ordersRaw = useSelector((state: RootState) => state.orders.adminOrders);

  const orders = [...ordersRaw].reverse()

  useEffect(() => {
    if (!admin) {
      router.push("/admin")
    }
  }, [])

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const getFirstLetter = (text: string) => {
    return text.slice(0, 1).toUpperCase()
  }

  return (
    <main className="py-20 bg-gray-100 px-4 md:px-6 min-h-screen">
      <AdminHeader />

      <h1 className="text-2xl font-jsans">Dashboard</h1>
      <p className="text-[14px] font-jsans text-gray-600 mt-1">View a report analysis summary of the platform</p>
      
      {/* stats cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6 gap-4">
        <div className="bg-white border-1 border-gray-200 p-6 rounded-xl flex-start gap-4">
          <div className="bg-indigo-900 p-4 rounded-xl text-white">
            <Users />
          </div>
          <div>
            <p className="font-jsans text-[13px] text-gray-600">Total Users</p>
            <h1 className="mt-2 text-xl font-jsans">{dashboard?.totalUsers}</h1>
          </div>
        </div>

         <div className="bg-white border-1 border-gray-200 p-6 rounded-xl flex-start gap-4">
          <div className="bg-indigo-900 p-4 rounded-xl text-white">
            <ShoppingBagIcon />
          </div>
          <div>
            <p className="font-jsans text-[13px] text-gray-600">Products Available</p>
            <h1 className="mt-2 text-xl font-jsans">{dashboard?.totalProducts}</h1>
          </div>
        </div>

         <div className="bg-white border-1 border-gray-200 p-6 rounded-xl flex-start gap-4">
          <div className="bg-indigo-900 p-4 rounded-xl text-white">
            <ShoppingCart />
          </div>
          <div>
            <p className="font-jsans text-[13px] text-gray-600">Total Orders</p>
            <h1 className="mt-2 text-xl font-jsans">{dashboard?.totalOrders}</h1>
          </div>
        </div>

        <div className="bg-white border-1 border-gray-200 p-6 rounded-xl flex-start gap-4">
          <div className="bg-indigo-900 p-4 rounded-xl text-white">
            <HandCoins />
          </div>
          <div>
            <p className="font-jsans text-sm text-gray-600">Total Income</p>
            <h1 className="mt-2 text-xl font-jsans">&#x20A6; {formatCurrency(dashboard!.totalIncome)}</h1>
          </div>
        </div>
      </section>

      {/* users & recent orders section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
        {/* orders */}
        <section className="bg-white p-6 border-1 border-gray-200 rounded-xl">
          <h1 className="text-lg font-jsans mb-6">Recent Orders</h1>

          {orders.map((ord: Order) => {
            return (
              <div className="flex-between mb-6">
                <div className="font-jsans">
                  <p className="text-lg">{ord.name}</p>
                  <div className="flex-start gap-2 mt-1 text-gray-500 text-[12px]">
                    <span>&#x20A6; {formatCurrency(ord.price * ord.quantity)}</span>
                    <div className="h-1 w-1 bg-gray-500 rounded-full flex"></div>
                    <span>{ord.deliveryDate}</span>
                  </div>
                </div>
                <p className={`${ord.status === "Processing" ? "bg-yellow-200 text-yellow-950" : "bg-green-200 text-green-950"} py-1 px-3 text-sm font-jsans-light text-[10px] rounded-full`}>{ord.status}</p>
              </div>
            )
          })}

        </section>

        {/* users */}
        <section className="bg-white p-6 border-1 border-gray-200 rounded-xl">
          <h1 className="text-lg font-jsans mb-6">Users</h1>

          {users?.map((usr: User) => {
            return (
              <div className="flex-start gap-4 mb-6">
                <div className="bg-indigo-400 font-jsans text-white h-9 w-9 flex-center rounded-full">
                  {getFirstLetter(usr.name)}
                </div>
                <div className="font-jsans">
                  <p className="text-sm">{usr.name}</p>
                  <p className="text-gray-500 text-[12px] ">{usr.email}</p>
                </div>
              </div>
            )
          })}
        </section>

      </section>
    </main>
  )
}

export default Dashboard