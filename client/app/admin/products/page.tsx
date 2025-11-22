"use client";

import AdminHeader from "@/components/AdminHeader"
import { Plus } from "lucide-react"
import { redirect, useRouter } from "next/navigation"

const Products = () => {
  const router = useRouter();

  const toCreate = () => {
    router.push("/admin/products/create")
  }

  return (
    <main className="bg-gray-50 py-20 min-h-screen">
      <AdminHeader />

      <section className="flex-center flex-col mt-30">
        <h1 className="font-jsans text-xl">Add Product</h1>

        <p className="mt-2 font-jsans-light text-center text-sm text-gray-800">Click the button below to create a new product</p>

        <button 
        onClick={toCreate} 
        className="btn-primary mt-4 py-2 px-4 rounded-xl font-jsans text-sm flex-center gap-2"
        >
          <span>Add</span>
          <Plus />
        </button>
      </section>
    </main>
  )
}

export default Products