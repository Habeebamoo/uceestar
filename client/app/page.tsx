"use client";

import ProductsSection from "@/components/ProductsSection";
import { setProducts } from "@/redux/reducers/productSlice";
import { type RootState } from "@/redux/store"
import { Bike, HandCoins, PhoneCall } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import Footer from "@/components/Footer";
import HeroDisplay from "@/components/HeroDisplay";

export type categories = "footwears" | "phones" | "laptops" | "gadgets" | "watches";

const Home = () => {
  const dispatch = useDispatch();
  const {} = useFetchProducts();

  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch])

  const [navbarActive, setNavbarActive] = useState<boolean>(false)

  return (
    <main className="bg-gray-50 min-h-screen">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />

      <HeroDisplay />

      <h1 className="font-jsans-light mt-10 text-center text-xl">New Arrivals</h1>

      {/* products */}
      <section className="mt-15 w-[95%] mx-auto">
        {products.length >= 1 && <ProductsSection products={products} />}
      </section>

      {/* footer */}
      <Footer />
    </main>
  )
}

export default Home