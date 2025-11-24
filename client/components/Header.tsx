"use client";

import { RootState } from "@/redux/store"
import { Menu, Search, ShoppingCart} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux"
import Navbar from "./Navbar";

interface Props {
  navbarActive: boolean,
  setNavbarActive: Dispatch<SetStateAction<boolean>>
}

const Header = ({ navbarActive, setNavbarActive }: Props) => {
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
      {navbarActive && <Navbar setNavbarActive={setNavbarActive} />}

      <nav className="p-4 flex-between lg:w-[70%] mx-auto">
        {/* logo */}
        <div
          onClick={toHome} 
          className="cursor-pointer"
        >
          <Image src="/logo.png" alt="logo" height={35} width={35} />
        </div>

        {/* icons */}
        <div className="flex-between gap-8">
          {/* Search */}
          <div className="cursor-pointer">
            <Search />
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

          <div 
            onClick={() => setNavbarActive(true)}
            className="cursor-pointer"
          >
            <Menu />
          </div>
        </div> 
      </nav>
    </header>
  )
}

export default Header