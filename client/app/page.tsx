"use client";

import ProductsSection from "@/components/ProductsSection";
import { setProducts } from "@/redux/reducers/productSlice";
import { type RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import Footer from "@/components/Footer";
import HeroDisplay from "@/components/HeroDisplay";
import FlashDeals from "@/components/FlashDeals";
import Category from "@/components/Category";
import { getRandom99 } from "@/utils/products";
import { ArrowRight } from "lucide-react";

export type categories = "footwears" | "phones" | "laptops" | "gadgets" | "watches";

const Home = () => {
  const dispatch = useDispatch();
  const {} = useFetchProducts();

  const products = useSelector((state: RootState) => state.products.products);
  const randomProducts = getRandom99(products)

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch])

  const [navbarActive, setNavbarActive] = useState<boolean>(false)

  return (
    <main className="bg-gray-50 min-h-screen">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />

      <HeroDisplay />

      <section className="flex-center flex-col mt-20 md:mt-30 mb-20">
        <h1 className="font-jsans text-3xl md:text-4xl xl:text-5xl">Search Our Categories</h1>

        <p className="mt-3 sm:mt-4 font-jsans-light text-center w-[90%] max-sm:text-sm">Explore our variety of premium footwears, gadgets and lifestyle essentials.</p>

        <button className="btn-blue font-outfit py-3 px-8 mt-6 rounded-full flex-center gap-2">
          <span>View Collections</span>
          <ArrowRight />
        </button>
      </section>

      <FlashDeals products={products} />

      {/* products */}
      <section className="mt-15 w-[95%] mx-auto">
        {randomProducts.length >= 1 && <ProductsSection products={randomProducts} />}
      </section>

      {/* footer */}
      <Footer />
    </main>
  )
}

export default Home