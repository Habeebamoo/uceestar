"use client";

import { ArrowRight, Home, ShoppingBag, ShoppingCart, X } from "lucide-react"
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react"
import { navVariant } from "@/utils/animations";

type Props = {
  setNavbarActive: Dispatch<SetStateAction<boolean>>
}

const AdminNavbar = ({ setNavbarActive }: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (url: string) => url === pathname;

  const close = () => {
    setNavbarActive(false)
  }

  const toStore = () => {
    router.push("/")
  }

  return (
    <div className="z-10 fixed top-0 bottom-0 left-0 right-0 bg-black/70">
      <motion.div
        initial="hidden"
        animate="show"
        variants={navVariant}  
        className="fixed top-0 bottom-0 right-0 w-[70%] sm:w-[50%] md:w-[25%] bg-white"
      >
        {/* cancel btn */}
        <div 
          onClick={close}
          className="cursor-pointer flex-end px-4 mt-4"
        >
          <X color="red" />
        </div>


        <div className="mt-14 px-2">
          <Link
            href={"/admin/dashboard"} 
            className={isActive("/admin/dashboard") ? "admin-nav-active" :  "admin-nav"}
          >
            <Home size={18} />
            <p className="font-jsans text-lg">Dashboard</p>
          </Link>

          <Link
            href={"/admin/products"} 
            className={isActive("/admin/products") ? "admin-nav-active" :  "admin-nav"}
          >
            <ShoppingBag size={18} />
            <p className="font-jsans text-lg">Products</p>
          </Link>

          <Link
            href={"/admin/orders"} 
            className={isActive("/admin/orders") ? "admin-nav-active" :  "admin-nav"}
          >
            <ShoppingCart size={18} />
            <p className="font-jsans text-lg">Orders</p>
          </Link>
        </div>

        <div className="absolute bottom-6 px-4">
          <button 
            onClick={toStore} 
            className="btn-blue font-outfit py-3 flex-center gap-2 px-8 rounded-full"
          >
            <span>Go to store</span>
            <ArrowRight />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminNavbar