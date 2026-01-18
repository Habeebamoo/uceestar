"use client";

import { decermentQuantity, incrementQuantity, removeFromCart } from "@/redux/reducers/cartSlice"
import { CartItem } from "@/types/cart"
import { FaTrashCan } from "react-icons/fa6"
import { useDispatch } from "react-redux"
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const CartItemDisplay = ({ item }: { item: CartItem }) => {
  const [count, setCount] = useState<number>(item.quantity)
  const dispatch = useDispatch()

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const deleteItem = () => {
    dispatch(removeFromCart(item))
  }

  const subtract = () => {
    if (count < 1) return
    setCount(count - 1)

    dispatch(decermentQuantity(item))
  }

  const add = () => {
    setCount(count + 1)

    dispatch(incrementQuantity(item))
  }

  return (
    <div className="bg-white p-4 border-1 border-gray-200 rounded-md">
      <div className="flex-start gap-3">
        {/* image */}
        <div className="bg-gray-100 h-20 w-25">
          <img src={item.image} className="w-full h-full object-cover object-center" />
        </div>

        <div>
          <p className="font-jsans-light text-[12px]">{item.category.toUpperCase()}</p>
          <h1 className="font-jsans mt-1">{item.name}</h1>
        </div>
      </div>

      <div className="flex-between mt-6 px-2">
        {/* price */}
        <div>
          <p className="font-jsans-light text-[12px]">Price</p>
          <p className="text-sm font-jsans">
            &#x20A6; {formatCurrency(item.price)}
          </p> 
        </div>

        <div>
          <button
            onClick={deleteItem}
            className="text-gray-500"
          >
            <FaTrashCan />
          </button>
        </div>
      </div>

      <hr className="text-gray-200 mt-4" />

      <div className="mt-2 flex-between px-2">
        <h1 className="font-jsans-light text-sm">Quantity</h1>

        <div className="grid grid-cols-3 rounded-lg py-3 gap-2 px-4">
          <div 
            className="cursor-pointer flex-center" 
            onClick={subtract}
          >
            <div className="p-3 rounded-md bg-gray-100 inline">
               <Minus size={15} />
            </div>
          </div>

          <div className="flex-center font-outfit">
            {count}
          </div>
          
          <div 
            className="cursor-pointer flex-center" 
            onClick={add}
          >
            <div className="p-3 rounded-md bg-gray-100 inline">
              <Plus size={15} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartItemDisplay