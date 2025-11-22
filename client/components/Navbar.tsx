"use client";

import { Home, ShoppingBag, X } from "lucide-react"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react"

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

  const toHome = () => {
    router.push("/")
  }

  return (
    <div className="z-20 fixed top-0 bottom-0 left-0 right-0 bg-black/70">
      <div className="fixed top-0 bottom-0 right-0 w-[55%] sm:w-[250px] bg-white">
        {/* cancel btn */}
        <div 
          onClick={close}
          className="cursor-pointer flex-end px-4 mt-4"
        >
          <X color="red" />
        </div>


        <div className="mt-14">
          <div
            onClick={toHome} 
            className="flex-start gap-2 px-4 hover:bg-gray-100 active:bg-gray-100 py-2 cursor-pointer"
          >
            <Home size={18} />
            <p className="font-jsans-light">Home</p>
          </div>

          <div
            onClick={toOrders} 
            className="flex-start gap-2 px-4 mt-4 hover:bg-gray-100 active:bg-gray-100 py-2 cursor-pointer"
          >
            <ShoppingBag size={18} />
            <p className="font-jsans-light">Orders</p>
          </div>
        </div>

        <div 
          onClick={() => router.push("/signin")}
          className="absolute bottom-[20px] right-0 left-0 px-2"
        >
          <button className="btn-primary text-sm font-jsans py-2 w-full rounded-full hover:text-indigo-950 active:text-indigo-950">
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar