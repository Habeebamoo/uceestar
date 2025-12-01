"use client";

import AdminHeader from "@/components/AdminHeader"
import { useFetchAdmin } from "@/hooks/useFetchAdmin"
import { useFetchAdminDashboard } from "@/hooks/useFetchAdminDashboard";
import { RootState } from "@/redux/store";
import { HandCoins, ShoppingBagIcon, ShoppingCart, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const {} = useFetchAdmin();
  const {} = useFetchAdminDashboard();
  const router = useRouter();

  const admin = useSelector((state: RootState) => state.user.admin);
  const dashboard = useSelector((state: RootState) => state.user.adminDashboard);

  useEffect(() => {
    if (!admin) {
      router.push("/admin")
    }
  }, [])

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <main className="pt-20 bg-gray-100 px-4 md:px-6 min-h-screen">
      <AdminHeader />

      {/* stats cards */}
      <h1 className="text-2xl font-jsans">Dashboard</h1>
      <p className="text-[14px] font-jsans text-gray-600 mt-1">View a report analysis summary of the platform</p>
      
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
    </main>
  )
}

export default Dashboard