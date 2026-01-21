"use client";

import { categories } from "@/app/page";
import AdminHeader from "@/components/AdminHeader"
import AdminProductDisplay from "@/components/AdminProductDisplay";
import AdminProductsTab from "@/components/AdminProductsTab";
import Loading from "@/components/Loading";
import { useFetchAdmin } from "@/hooks/useFetchAdmin";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { RootState } from "@/redux/store";
import { Product } from "@/types/product";
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const { isLoading } = useFetchAdmin();
  const {} = useFetchProducts();
  const router = useRouter();

  const [category, setCategory] = useState<string>("footwears")

  const admin = useSelector((state: RootState) => state.user.admin);
  const products = useSelector((state: RootState) => state.products.products);

  if (isLoading) return <Loading/>

  if (!admin) {
    router.push("/admin")
  }

  const toCreate = () => {
    router.push("/admin/products/create")
  }

  const filteredProducts = products.filter(prd => prd.category === category)

  return (
    <main className="bg-gray-50 py-20 px-4 min-h-screen">
      <AdminHeader />

      <section className="flex-between mb-10 md:px-10">
        <h1 className="font-jsans text-2xl">All Products</h1>

        <button 
        onClick={toCreate} 
        className="btn-primary py-2 px-3 rounded-xl font-jsans text-[12px] flex-center gap-2"
        >
          <span>Add</span>
          <Plus size={15} />
        </button>
      </section>

      {/* tab */}
      <AdminProductsTab category={category} setCategory={setCategory} />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mt-10">
        {filteredProducts.map((prd: Product) => {
          return <AdminProductDisplay key={prd._id} product={prd} />
        })}
      </section>
    </main>
  )
}

export default Products