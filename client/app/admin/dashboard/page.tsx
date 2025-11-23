"use client";

import AdminHeader from "@/components/AdminHeader"
import { useFetchAdmin } from "@/hooks/useFetchAdmin"
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const {} = useFetchAdmin();
  const router = useRouter();

  const admin = useSelector((state: RootState) => state.user.admin);

  useEffect(() => {
    if (!admin) {
      router.push("/admin")
    }
  }, [])

  return (
    <main className="pt-20 bg-gray-50 px-4 min-h-screen">
      <AdminHeader />

      <section className="mt-20 flex-center flex-col">
        <h1 className="font-jsans text-xl">Admin Dashboard</h1>
        <p className="font-jsans-light mt-2 text-sm">COMING SOON!</p>
      </section>
    </main>
  )
}

export default Dashboard