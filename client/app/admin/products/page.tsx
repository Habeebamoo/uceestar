"use client";

import AdminHeader from "@/components/AdminHeader"
import AdminProductDisplay from "@/components/AdminProductDisplay";
import { useFetchAdmin } from "@/hooks/useFetchAdmin";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { RootState } from "@/redux/store";
import { Product } from "@/types/product";
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const {} = useFetchAdmin();
  const {} = useFetchProducts();
  const router = useRouter();

  const admin = useSelector((state: RootState) => state.user.admin);
  const products = useSelector((state: RootState) => state.products.products)

  useEffect(() => {
    if (!admin) {
      router.push("/admin")
    }
  }, [])

  const toCreate = () => {
    router.push("/admin/products/create")
  }

  return (
    <main className="bg-gray-50 py-20 px-4 min-h-screen">
      <AdminHeader />

      <section className="flex-between mb-10">
        <h1 className="font-jsans text-2xl">All Products</h1>

        <button 
        onClick={toCreate} 
        className="btn-primary py-2 px-3 rounded-xl font-jsans text-[12px] flex-center gap-2"
        >
          <span>Add</span>
          <Plus size={15} />
        </button>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((prd: Product) => {
          return <AdminProductDisplay key={prd._id} product={prd} />
        })}
      </section>
    </main>
  )
}

export default Products