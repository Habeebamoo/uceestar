"use client";

import CategoryTab from "@/components/CategoryTab"
import ProductsSection from "@/components/ProductsSection";
import { setProducts } from "@/redux/reducers/productSlice";
import { type RootState } from "@/redux/store"
import { ArrowRight, Bike, PhoneCall } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import Footer from "@/components/Footer";

export type categories = "footwears" | "phones" | "laptops" | "gadgets" | "watches";

const Home = () => {
  const dispatch = useDispatch();
  const {} = useFetchProducts();

  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch])

  const storeProducts = useSelector((state: RootState) => state.products.products)

  const [category, setCategory] = useState<categories>("footwears")
  const [navbarActive, setNavbarActive] = useState<boolean>(false)

  const filteredProducts = storeProducts.filter((prod) => prod.category === category).reverse()

  return (
    <main className="bg-gray-50 min-h-screen">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />
      {/* Hero Section */}
      <section className="mt-16 hero-section">
        <div className="bg-black/80 py-20 flex-center flex-col">
          <div className="py-2 px-4 rounded-full bg-gray-200/20 flex-center gap-2 border-1 border-gray-600">
            <div className="h-[7px] w-[7px] rounded-full bg-indigo-950"></div>
            <p className="font-jsans text-white text-[10px]">Discover Curated Collections</p>
          </div>

          <div className="text-white mt-4 leading-tight">
            <p className="font-jsans text-center text-[45px]">Style Meets</p>
            <p className="font-jsans-light text-center text-[40px]">Innovation</p>
          </div>

          <div className="bg-gradient-to-r from-indigo-800 to-indingo-400 h-1 rounded-full mt-1 w-[200px]"></div>

          <p className="font-jsans-light text-gray-200 text-sm mt-6 text-center text-[17px] leading-relaxed w-[80%] sm:w-[50%] lg:w-[30%]">Discover curated collections of premium footwears, cutting-edge technologies and lifestyle essentials crafted for the modern world</p>

          <button className="btn-primary py-3 px-6 flex-center gap-2 mt-8">
            <span>Explore Now</span>
            <ArrowRight size={14} />
          </button>
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
            <PhoneCall />
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