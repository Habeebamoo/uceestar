"use client";

import { RootState } from "@/redux/store"
import { Search, ShoppingCart} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux"

const Header = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const router = useRouter();

  const getCartItemsQuantity = (): number => {
    let quantity: number = 0;

    cart.forEach(item => {
      quantity += item.quantity;
    })

    return quantity
  }

  const toCart = () => {
    router.push("/cart")
  }

  const toHome = () => {
    router.push("/")
  }

  const itemsAmount = getCartItemsQuantity();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow">
      <nav className="p-4 flex-between lg:w-[70%] mx-auto">
        {/* logo */}
        <div
          onClick={toHome} 
          className="cursor-pointer"
        >
          <Image src="/logo.png" alt="logo" height={35} width={35} />
        </div>

        {/* search */}
        <div className="cursor-pointer relative">
          <div className="absolute top-[12px] left-3">
            <Search size={15} />
          </div>

          <input 
            type="search" 
            className="bg-gray-100 w-full p-2 text-sm font-jsans pl-9 focus:outline-none rounded-full border-1 border-gray-200"
            placeholder="Find Products"
          />
        </div>

        {/* cart */}
        <div 
          onClick={toCart}
          className="cursor-pointer relative"
        >
          <p className="absolute h-5 w-5 flex-center bg-indigo-900 text-white rounded-full text-[10px] font-jsans right-[-10] top-[-10]">
            {itemsAmount}
          </p>
          <ShoppingCart />
        </div>

      </nav>
    </header>
  )
}

export default Header