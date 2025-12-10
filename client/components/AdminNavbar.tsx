"use client";

import { Home, ShoppingBag, ShoppingCart, X } from "lucide-react"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react"

type Props = {
  setNavbarActive: Dispatch<SetStateAction<boolean>>
}

const AdminNavbar = ({ setNavbarActive }: Props) => {
  const router = useRouter()

  const close = () => {
    setNavbarActive(false)
  }

  const toProducts = () => {
    router.push("/admin/products")
  }

  const toOrders = () => {
    router.push("/admin/orders")
  }

  const toHome = () => {
    router.push("/admin/dashboard")
  }

  return (
    <div className="z-10 fixed top-0 bottom-0 left-0 right-0 bg-black/70">
      <div className="fixed top-0 bottom-0 right-0 w-[70%] sm:w-[250px] bg-white">
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
            <p className="font-jsans-light">Dashboard</p>
          </div>

          <div
            onClick={toProducts} 
            className="flex-start gap-2 px-4 mt-4 hover:bg-gray-100 active:bg-gray-100 py-2 cursor-pointer"
          >
            <ShoppingBag size={18} />
            <p className="font-jsans-light">Products</p>
          </div>

          <div
            onClick={toOrders} 
            className="flex-start gap-2 px-4 mt-4 hover:bg-gray-100 active:bg-gray-100 py-2 cursor-pointer"
          >
            <ShoppingCart size={18} />
            <p className="font-jsans-light">Orders</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar