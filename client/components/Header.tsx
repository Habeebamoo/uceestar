"use client";

import { RootState } from "@/redux/store"
import { Menu, Search, ShoppingCart} from "lucide-react"
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
    <header className="fixed top-0 left-0 right-0 bg-amber-50 shadow">
      <nav className="p-6 flex-between">
        {/* logo */}
        <div
          onClick={toHome} 
          className="flex-start font-playfair-bold cursor-pointer"
        >
          <Image src="/logo.png" alt="logo" height={30} width={30} />
          <span className="mt-2 text-indigo-950">ceestar</span>
        </div>

        {/* icons */}
        <div className="flex-between gap-8">
          <div className="cursor-pointer">
            <Search />
          </div>
          <div 
            onClick={toCart}
            className="cursor-pointer relative"
          >
            <p className="absolute h-5 w-5 flex-center bg-indigo-900 text-white rounded-full text-[10px] font-jsans right-[-10] top-[-10]">
              {itemsAmount}
            </p>
            <ShoppingCart />
          </div>
          <div className="cursor-pointer">
            <Menu />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header