"use client";

import { RootState } from "@/redux/store"
import { Menu, ShoppingCart} from "lucide-react"
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux"
import Navbar from "./Navbar";
import Link from "next/link";

interface Props {
  navbarActive: boolean,
  setNavbarActive: Dispatch<SetStateAction<boolean>>
}

const Header = ({ navbarActive, setNavbarActive }: Props) => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const router = useRouter();
  const pathname = usePathname()

  const isActve = (url: string) => pathname === url;

  const getCartItemsQuantity = (): number => {
    let quantity: number = 0;

    cart.forEach(item => {
      quantity += item.quantity;
    })

    return quantity
  }

  const toSignin = () => {
    router.push("/signin")
  }

  const toCart = () => {
    router.push("/cart")
  }

  const itemsAmount = getCartItemsQuantity();

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white p-4 md:px-8 border-b-1 border-gray-100">
      {navbarActive && <Navbar setNavbarActive={setNavbarActive} />}

      <nav className="flex-between">
        <div>
          <img src="/logo.png" className="w-8" />
        </div>

        <div className="flex-between gap-10">
          {/* navs */}
          <div className="max-lg:hidden font-jsans flex justify-center items-start mr-10 gap-6">

            <Link 
              href="/" 
              className={isActve("/") ? "header-link-active" : ""}
            >
              <p>Home</p>
            </Link>

            <Link 
              href="/orders"
              className={isActve("/orders") ? "header-link-active" : ""}
            >
              <p>My Orders</p>
            </Link>

            <Link 
              href="/contact"
              className={isActve("/contact") ? "header-link-active" : ""}
            >
              <p>Contact Us</p>
            </Link>

          </div>

          {/* cart & menu */}
          <div className="flex-center gap-8">
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
              className="cursor-pointer lg:hidden"
            >
              <Menu />
            </div>
          </div>

          {/* sign in */}
          <div className="max-lg:hidden">
            <button 
              onClick={toSignin}
              className="btn-blue text-sm font-jsans py-2 px-6 rounded-full mt-0"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header