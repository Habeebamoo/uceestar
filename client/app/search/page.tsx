"use client";

import FootwearSearch from "@/components/FootwearSearch";
import Header from "@/components/Header"
import LaptopsSearch from "@/components/LaptopsSearch";
import PhoneSearch from "@/components/PhonesSearch";
import WatchesSearch from "@/components/WatchesSearch";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { RootState } from "@/redux/store";
import { Product } from "@/types/product";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux";

const SearchPage = () => {
  const {} = useFetchProducts();
  const products = useSelector((state: RootState) => state.products.products);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [query, setQuery] = useState<string>("")
  const [navbarActive, setNavbarActive] = useState<boolean>(false)

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)

    const matchingProducts = products.filter((prd) => prd.name.toLowerCase().includes(query.toLowerCase()) || prd.description.toLowerCase().includes(query.toLowerCase()));

    setFilteredProducts(matchingProducts)
  }

  return (
    <main className="pt-22 md:pt-28 pb-30 min-h-screen">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />

      <div className="relative w-[90%] sm:w-100 mx-auto">
        <div className="absolute top-3.75 left-3.5">
          <Search size={20} />
        </div>
        <input 
          type="search"
          name="query"
          className="p-3 pl-11 bg-gray-100 border border-gray-200 rounded-xl block font-outfit text-gray-800 focus:outline-none w-full" 
          placeholder="Nike"
          value={query}
          onChange={handleQuery}
        />
      </div>

      <FootwearSearch products={filteredProducts.length >= 1 ? filteredProducts : products} />
      <WatchesSearch products={filteredProducts.length >= 1 ? filteredProducts : products} />
      <PhoneSearch products={filteredProducts.length >= 1 ? filteredProducts : products}  />
      <LaptopsSearch products={filteredProducts.length >= 1 ? filteredProducts : products} />
    </main>
  )
}

export default SearchPage