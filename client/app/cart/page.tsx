"use client";

import CartItemDisplay from "@/components/CartItemDisplay";
import { type RootState } from "@/redux/store"
import { CartItem } from "@/types/cart";
import { useSelector } from "react-redux"

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);

  if (cart.length === 0) {
    return (
      <div className="mt-20">
        <p>Empty</p>
      </div>
    )
  }

  const getCartItemsQuantity = (): number => {
    let quantity: number = 0;

    cart.forEach(item => {
      quantity += item.quantity;
    })

    return quantity
  }

  const itemsAmount = getCartItemsQuantity();

  return (
    <main className="pt-26 bg-amber-50 px-4">
      {/* heading */}
      <div className="font-jsans flex-between">
         <h1 className="text-xl">Shopping Cart</h1>
         <p className="font-bold">{itemsAmount} Items</p>
      </div>
      <hr className="text-gray-200 mt-6" />

      {/* table */}
      <table className="mt-6 w-full">
        <thead className="text-gray-500 text-[12px] font-jsans-light text-left">
          <tr>
            <th className="w-1/3 p-1">
              DETAILS
            </th>
            <th className="w-30 p-1">
              PRICE
            </th>
            <th className="w-20 p-1">
              QUANTITY
            </th>
            <th className="w-30 p-1">
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item: CartItem) => <CartItemDisplay key={item.id} item={item} />)}
        </tbody>
      </table>
    </main>
  )
}

export default Cart