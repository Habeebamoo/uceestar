"use client";

import { Product } from "@/types/product"
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react";

interface Props {
  product: Product
}

const ProductDisplay = ({ product }: Props) => {
  const [viewBtn, setViewBtn] = useState<boolean>(false)
  const router = useRouter()

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const toProduct = () => {
    router.push(`/products/${product._id}`)
  }

  return (
    <div
      onClick={() => setViewBtn(true)} 
      className="bg-white rounded-md overflow-hidden cursor-pointer"
    >
      <div className="h-37.5 w-40 relative w-full">
        <img src={product.image} className="w-full hover:scale-110 transition-transform duration-300 h-full object-center object-cover" />

        {viewBtn && 
          <div
            onClick={toProduct} 
            className="absolute top-0 bottom-0 left-0 right-0 rounded-t-md bg-black/80 flex-center cursor-pointer"
          >
            <Link
              href={`/products/${product._id}`} 
              className="text-sm text-white font-jsans-light"
            >
              Click to view
            </Link>
          </div>
        }
      </div>

      <div className="bg-white py-3 px-4">
        <p className="font-jsans">{product.name}</p>

        <div className="mt-4 font-jsans text-[15px] flex-start gap-1">
          <span>&#x20A6;</span>
          <p>{formatCurrency(product.price)}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay