"use client";

import { Home, Phone, ShoppingCart, X } from "lucide-react"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react"
import { motion } from "framer-motion"
import { navVariant } from "@/utils/animations";

type Props = {
  setNavbarActive: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({ setNavbarActive }: Props) => {
  const router = useRouter()

  const close = () => {
    setNavbarActive(false)
  }

  const toOrders = () => {
    router.push("/orders")
  }

  const toContact = () => {
    router.push("/contact")
  }

  const toHome = () => {
    router.push("/")
  }

  return (
    <div
      className="z-[9999] fixed isolate inset-0 top-0 bottom-0 left-0 right-0 lg:hidden bg-black/70"
    >
      <motion.div 
        initial="hidden"
        animate="show"
        variants={navVariant} 
        className="fixed top-0 bottom-0 right-0 w-[70%] sm:w-[50%] md:w-[35%] bg-white"
      >
        {/* cancel btn */}
        <div 
          onClick={close}
          className="cursor-pointer flex-end px-4 mt-4"
        >
          <X color="red" />
        </div>


        <div className="mt-14 px-2">
          <div
            onClick={toHome} 
            className="flex-start gap-4 px-4 hover:bg-gray-100 active:bg-gray-100 py-2 cursor-pointer"
          >
            <Home size={20} />
            <p className="font-jsans text-lg">Home</p>
          </div>

          <div
            onClick={toOrders} 
            className="flex-start gap-4 px-4 mt-6 hover:bg-gray-100 active:bg-gray-100 py-2 cursor-pointer"
          >
            <ShoppingCart size={20} />
            <p className="font-jsans text-lg">Orders</p>
          </div>

          <div
            onClick={toContact} 
            className="flex-start gap-4 px-4 mt-6 hover:bg-gray-100 active:bg-gray-100 py-2 cursor-pointer"
          >
            <Phone size={20} />
            <p className="font-jsans text-lg">Contact Us</p>
          </div>
        </div>

        <div 
          onClick={() => router.push("/signin")}
          className="absolute bottom-[30px] right-0 left-0 px-5"
        >
          <h1 className="font-jsans-light text-gray-700 mb-2">
            Become a member to access the best products and latest gadgets.
          </h1>
          
          <button 
            className="btn-blue text-sm py-3 px-8 rounded-full"
          >
            Sign In
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Navbar