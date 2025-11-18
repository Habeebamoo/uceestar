"use client";

import CategoryTab from "@/components/CategoryTab"
import ProductDisplay from "@/components/ProductDisplay";
import { Product } from "@/types/Product";
import { ArrowRight } from "lucide-react"
import { useState } from "react"

const products: Product[] = [
  {name: "Nike Sneakers", price: 16000, category: "sneakers" },
  {name: "Addidas", price: 85000, category: "sneakers" },
  {name: "Nike", price: 19500, category: "loafers" },
]

export type categories = "sneakers" | "loafers" | "huddies" | "phones" | "watches" | "limiters" | "trackers";

const Home = () => {
  const [category, setCategory] = useState<categories>("sneakers")

  const filteredProducts = products.filter((prod) => prod.category === category)

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="mt-20 hero-section">
        <div className="bg-black/70 py-20 flex-center flex-col">
          <div className="py-2 px-4 rounded-full bg-gray-200/20 flex-center gap-2 border-1 border-gray-500">
            <div className="h-[7px] w-[7px] rounded-full bg-indigo-950">

            </div>
            <p className="font-jsans text-white text-[10px]">Discover Curated Collections</p>
          </div>

          <div className="text-white mt-4 leading-tight">
            <p className="font-jsans text-center text-[45px]">Style Meets</p>
            <p className="font-jsans-light text-center text-[40px]">Innovation</p>
          </div>

          <p className="font-jsans-light text-gray-200 text-sm mt-6 text-center text-[17px] leading-relaxed w-[80%] sm:w-[50%] lg:w-[30%]">Discover curated collections of premium footwears, cutting-edge technologies and lifestyle essentials crafted for the modern world</p>

          <button className="btn-primary py-3 px-6 flex-center gap-2 mt-8">
            <span>Explore Now</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* category tab */}
      <section className="mt-12">
        <h1 className="font-jsans text-2xl text-center mb-8">Categories</h1>

        <CategoryTab 
          category={category} 
          setCategory={setCategory} 
        />
      </section>

      {/* products */}
      <section className="mt-10 mb-40 w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(prod => <ProductDisplay product={prod} /> )}
      </section>
    </main>
  )
}

export default Home