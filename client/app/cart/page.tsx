"use client";

import CartItemDisplay from "@/components/CartItemDisplay";
import { type RootState } from "@/redux/store"
import { CartItem } from "@/types/cart";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react"
import { useState } from "react";
import { clearCart } from "@/redux/reducers/cartSlice";
import { useFetchUser } from "@/hooks/useFetchUser";
import { useRouter } from "next/navigation";

const Cart = () => {
  const dispatch = useDispatch()
  const {} = useFetchUser();
  const router = useRouter();

  const [location, setLocation] = useState<string>("lagos")

  const cart = useSelector((state: RootState) => state.cart.cart);
  const user = useSelector((state: RootState) => state.user.profile);

  if (cart.length === 0) {
    return (
      <div className="mt-20">
        <p>Empty</p>
      </div>
    )
  }

  const purchaseCart = () => {
    if (!user) {
      router.push("/signin")
      return
    }
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

  const getDeliveryCost = () => {
    let deliveryCost: number = 0;

    if (location === "lagos") {
      deliveryCost = 5000
    } else if (location === "ogun") {
      deliveryCost = 7000
    }

    return deliveryCost;
  }

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const itemsAmount = getCartItemsQuantity();
  const cost = getTotalCost();
  const deliveryCost = getDeliveryCost();
  const totalCost = cost + deliveryCost;
  

  return (
    <main className="bg-gray-50 pt-24 pb-20 px-4 min-h-screen">
      {/* heading */}
      <div className="font-jsans flex-between">
         <h1 className="text-xl">Shopping Cart</h1>
         <p className="font-bold">{itemsAmount} Items</p>
      </div>
      <hr className="text-gray-200 mt-6" />

      {/* products */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {cart.map((item: CartItem) => <CartItemDisplay key={item.id} item={item} />)}
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
      <div className="w-full sm:w-[400px] mx-auto p-6 bg-white border-1 border-gray-100 rounded-lg mt-10">
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

        <div className="text-sm mt-4 flex-between">
          <p className="font-jsans">Your Location</p>
          <select 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-gray-100 py-2 px-4 font-jsans border-1 border-gray-200"
          >
            <option value="lagos">Lagos</option>
            <option value="ogun">Ogun</option>
          </select>
        </div>

        <div className="flex-between text-sm mt-4">
          <p className="font-jsans">Delivery</p>
          <p className="font-jsans-light">&#x20A6; {formatCurrency(deliveryCost)}</p>
        </div>

        <hr className="text-gray-100 mt-6" />

        <div className="flex-between mt-4 text-indigo-950">
          <p className="font-jsans">Total Price</p>
          <p className="font-jsans">&#x20A6; {formatCurrency(totalCost)}</p>
        </div>

        <div className="mt-6"> 
          <button
            onClick={purchaseCart} 
            className="btn-primary text-sm py-2 w-full rounded-md col-span-2 hover:text-indigo-950 active:text-indigo-950"
          >
            Purchase
          </button>
        </div>
      </div>
    </main>
  )
}

export default Cart