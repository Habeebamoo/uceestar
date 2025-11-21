"use client";

import Counter from "@/components/Counter";
import Header from "@/components/Header";
import { addToCart } from "@/redux/reducers/cartSlice";
import { RootState } from "@/redux/store";
import { CartItem } from "@/types/cart";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const params = useParams();
  const slug = params.slug;
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState<number>(1)

  const products = useSelector((state: RootState) => state.products.products)

  const cart = useSelector((state: RootState) => state.cart.cart)

  console.log(cart)

  const product = products.find(prod => prod._id == slug)

  if (!product) return <p className="mt-20">Not Found</p>

  const addProductToCart = () => {
    const item: CartItem = { ...product!, quantity }
    dispatch(addToCart(item))

    toast.success("Added To Cart")
  }

  const formerPrice = (product!.price) + (product!.price * 0.15)

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <main className="pt-20 px-4">
      <Header />
      <Toaster position="top-center" />
      <div className="h-60 bg-gray-100">
        {/* image */}
      </div>

      {/* category */}
      <p className="text-sm font-jsans-light mt-4 text-sm">
        {product.category.toUpperCase()}
      </p>

      {/* name */}
      <p className="text-2xl font-jsans mt-2">{product?.name}</p>

      {/* price */}
      <div className="mt-4 flex-between">
        <p className="font-jsans text-lg font-bold">&#x20A6; {formatCurrency(product?.price)}</p>

        <div className="flex-center gap-3">
          <p className="font-jsans font-bold text-gray-600 line-through">&#x20A6; {formatCurrency(formerPrice)}</p>

          <p className="bg-yellow-400 font-jsans py-1 px-3 rounded-full text-[12px]">-15%</p>
        </div>
      </div>

      {/* description */}
      {product.description &&
        <div className="mt-8">
          <h1 className="text-xl font-jsans">Description</h1>
          <p className="text-sm font-jsans text-gray-500 mt-2">{product.description}</p>
        </div>
      }

      <hr className="text-gray-200 mt-6" />

      <p className="font-jsans text-sm mt-4">Quantity</p>

      <div className="mt-4 mb-60 grid grid-cols-2 gap-4 sm:w-[500px] mx-auto">
        <Counter count={quantity} setCount={setQuantity} />

        <button 
          onClick={addProductToCart} 
          className="btn-primary text-sm py-3 w-full hover:text-indigo-950 active:text-indigo-950 rounded-lg"
        >
          Add To Cart
        </button>
      </div>
    </main>
  )
}

export default Page