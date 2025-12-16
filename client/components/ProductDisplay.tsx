import { Product } from "@/types/product"
import Link from "next/link"

interface Props {
  product: Product
}

const ProductDisplay = ({ product }: Props) => {
  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="bg-white border-1 border-gray-100 rounded-xl">
      <div className="h-[180px] bg-gray-200 rounded-t-xl overflow-hidden">
        <img src={product.image} className="h-full w-full" />
      </div>
      <div className="py-3 px-4">
        <p className="font-jsans-light text-[12px] mb-1">{product.category.toUpperCase()}</p>
        <p className="font-jsans text-lg">{product.name}</p>

        <div className="mt-4 font-jsans-light flex-start gap-1">
          <span>&#x20A6;</span>
          <p>{formatCurrency(product.price)}</p>
        </div>

        <button className="btn-blue py-2 px-4 text-sm mb-2 w-full">
          <Link href={`/products/${product._id}`}>
            View Product
          </Link>
        </button>
      </div>
    </div>
  )
}

export default ProductDisplay