"use client";

import CartItemDisplay from "@/components/CartItemDisplay";
import { type RootState } from "@/redux/store"
import { CartItem } from "@/types/cart";
import { useDispatch, useSelector } from "react-redux";
import { Binoculars, ShoppingCart } from "lucide-react"
import { useState } from "react";
import { clearCart } from "@/redux/reducers/cartSlice";
import { useFetchUser } from "@/hooks/useFetchUser";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cart = () => {
  const dispatch = useDispatch()
  const {} = useFetchUser();
  const [navbarActive, setNavbarActive] = useState<boolean>(false)
  const router = useRouter();

  const cart = useSelector((state: RootState) => state.cart.cart);
  const user = useSelector((state: RootState) => state.user.profile);

  if (cart.length === 0) {
    return (
      <div className="pt-40">
        <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />
        
        <div className="flex-center flex-col text-gray-800">
          <Binoculars size={40} />
          <p className="font-outfit text-sm mt-4 text-center w-[80%]">Nothing here yet, Go back and browse our vast collection of products</p>
        </div>
      </div>
    )
  }

  const deleteCart = () => {
    dispatch(clearCart([]))
  }

  const getCartItemsQuantity = (): number => {
    let quantity: number = 0;

    cart.forEach(item => {
      quantity += item.quantity;
    })

    return quantity
  }

  const getTotalCost = () => {
    let cost: number = 0;

    cart.forEach(item => {
      cost += item.price * item.quantity;
    })

    return cost
  }

  const toCheckout = () => {
    if (!user) {
      router.push("/signin")
      return
    }

    router.push("/checkout")
  }

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const itemsAmount = getCartItemsQuantity();
  const cost = getTotalCost();

  return (
    <main className="bg-gray-50 pt-24 min-h-screen">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />

      {/* heading */}
      <div className="px-4 sm:w-[600px] mx-auto">
         <div className="font-jsans flex-between">
            <h1 className="text-xl">Shopping Cart</h1>
            <p className="font-bold">{itemsAmount} Items</p>
         </div>
         <hr className="text-gray-200 mt-6" />
      </div>

      {/* products */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 px-4 md:px-8">
        {cart.map((item: CartItem, i) => {
          return (
            <CartItemDisplay key={i} item={item} />
          )
        })}
      </section>


      <div className="flex-center mt-10">
        <button 
          onClick={deleteCart}
          className="btn-primary bg-red-500 border-red-500 hover:text-red-500 active:text-red-500 py-2 px-4 text-[12px] font-jsans"
        >
          Empty Cart
        </button>
      </div>

      {/* checkout */}
      <form 
        onClick={toCheckout} 
        className="w-[90%] sm:w-[400px] mx-auto p-6 bg-white border-1 border-gray-200 rounded-lg mt-10"
      >
        <div className="flex-start gap-2">
          <ShoppingCart />
          <h1 className="font-jsans">Checkout</h1>
        </div>

        <div className="flex-between mt-8 text-sm">
          <p className="font-jsans">Total Items</p>
          <p className="font-jsans-light">{itemsAmount}</p>
        </div>

        <div className="flex-between mt-4 text-sm">
          <p className="font-jsans">Cost</p>
          <p className="font-jsans-light">&#x20A6; {formatCurrency(cost)}</p>
        </div>

        <hr className="text-gray-100 mt-6" />

        <div className="mt-6"> 
          <button
            className="btn-primary text-sm py-2 w-full rounded-md col-span-2 hover:text-indigo-950 active:text-indigo-950"
          >
            Checkout
          </button>
        </div>
      </form>

      {/* footer */}
      <Footer />
    </main>
  )
}

export default Cart