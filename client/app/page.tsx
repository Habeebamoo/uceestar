"use client";

import CategoryTab from "@/components/CategoryTab"
import ProductsSection from "@/components/ProductsSection";
import { setProducts } from "@/redux/reducers/productSlice";
import { type RootState } from "@/redux/store"
import { ArrowRight, Bike, HandCoins, PhoneCall } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export type categories = "footwears" | "phones" | "laptops" | "gadgets" | "watches";

const Home = () => {
  const dispatch = useDispatch();
  const {} = useFetchProducts();
  const router = useRouter();

  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch])

  const storeProducts = useSelector((state: RootState) => state.products.products)

  const [category, setCategory] = useState<categories>("footwears")
  const [navbarActive, setNavbarActive] = useState<boolean>(false)

  const filteredProducts = storeProducts.filter((prod) => prod.category === category).reverse();

  const toSearch = () => {
    router.push("/search")
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />

      {/* Hero Section */}
      <section className="relative z-0 mt-15">
        <img src="/hero1.jpeg" className="md:object-cover md:object-[50%_80%] h-[750px] md:h-[650px] w-full" />
        
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent from-0% via-black/80 via-40% to-black to-80%">
          <div className="bottom-[50px] px-6 md:px-10 absolute">
            <h1 className="text-5xl md:text-6xl font-jsans mt-20 text-white">Style Meets Innovation</h1>
             <p className="font-jsans-light text-gray-200 text-sm mt-8 text-[17px] leading-relaxed w-[70%] sm:w-[60%] lg:w-[40%]">Discover curated collections of premium footwears, cutting-edge technologies and lifestyle essentials crafted for the modern world</p>

            <button onClick={toSearch} className="btn-primary py-3 px-6 flex-center gap-2 mt-10">
              <span>Explore Now</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* category tab */}
      <section className="mt-12">
        <h1 className="font-jsans text-xl text-center mb-8">Shop By Categories</h1>

        <CategoryTab 
          category={category} 
          setCategory={setCategory} 
        />
      </section>

      {/* products */}
      <section className="mt-10 w-[95%] mx-auto">
        {filteredProducts.length >= 1 && <ProductsSection products={filteredProducts} />}
      </section>

      <section className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8 md:w-[700px] mx-auto">
        <div className="flex-center flex-col">
          <div className="bg-indigo-950 h-12 w-12 rounded-full flex-center text-white">
            <Bike />
          </div>
          <h1 className="font-outfit text-xl text-center mt-2">Fast Delivery</h1>
          <p className="text-[12px] text-gray-500 font-outfit w-[60%] md:w-[80%] text-center mt-1">Delivery of goods typically takes 2-3 days to complete.</p>
        </div>

        <div className="flex-center flex-col">
          <div className="bg-indigo-950 h-12 w-12 rounded-full flex-center text-white">
            <PhoneCall />
          </div>
          <h1 className="font-outfit text-xl text-center mt-2">24/7 Customer Support</h1>
          <p className="text-[12px] text-gray-500 font-outfit w-[60%] md:w-[80%] text-center mt-1">Reach our hotline anytime of the day for your complains and info.</p>
        </div>

        <div className="flex-center flex-col">
          <div className="bg-indigo-950 h-12 w-12 rounded-full flex-center text-white">
            <HandCoins />
          </div>
          <h1 className="font-outfit text-xl text-center mt-2">Money-Back Guarantee</h1>
          <p className="text-[12px] text-gray-500 font-outfit w-[60%] md:w-[80%] text-center mt-1">We are totally fine with refunds if any disatisfaction arise.</p>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </main>
  )
}

export default Home