"use client";

import Header from "@/components/Header"
import ProductsSection from "@/components/ProductsSection";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { RootState } from "@/redux/store";
import { Product } from "@/types/product";
import { Search } from "lucide-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

const SearchPage = () => {
  const {} = useFetchProducts();
  const products = useSelector((state: RootState) => state.products.products);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [query, setQuery] = useState<string>("")
  const [navbarActive, setNavbarActive] = useState<boolean>(false)

  useEffect(() => {
    const matchingProducts = products.filter((prd) => prd.name.toLowerCase().includes(query.toLowerCase()) || prd.description.toLowerCase().includes(query.toLowerCase()));

    setFilteredProducts(matchingProducts)
  }, [query])

  return (
    <main className="bg-gray-50 pt-24 pb-30 px-4 min-h-screen">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />

      <h1 className="text-3xl text-indigo-950 font-outfit text-center">Search Products</h1>
      <p className="font-outfit text-sm mt-1 text-center text-gray-700">Explore our vast collections of product raging from wears to accessories.</p>

      <div className="relative mt-6 sm:w-[400px] mx-auto">
        <div className="absolute top-[15px] left-[14px]">
          <Search size={20} />
        </div>
        <input 
          type="search"
          className="p-3 pl-11 border-1 border-gray-300 rounded-xl block font-jsans text-gray-800 focus:outline-none w-full" 
          placeholder="Nike"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* products */}
      <section className="mt-20 w-[95%] mx-auto">
        <ProductsSection products={filteredProducts} />
      </section>
    </main>
  )
}

export default SearchPage