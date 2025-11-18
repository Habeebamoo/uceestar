import { Product } from "@/types/Product"
import {} from "lucide-react"

interface Props {
  product: Product
}

const ProductDisplay = ({ product }: Props) => {
  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="bg-white border-1 border-gray-100">
      <div className="h-[250px] bg-gray-200">

      </div>
      <div className="py-3 px-4">
        <p className="font-jsans-light text-[12px] mb-1">{product.category.toUpperCase()}</p>
        <p className="font-jsans text-lg">{product.name}</p>

        <div className="mt-4 font-jsans-light flex-start gap-1">
          <span>&#x20A6;</span>
          <p>{formatCurrency(product.price)}</p>
        </div>

        <button className="btn-blue py-2 px-4 text-sm mb-2">
          View Product
        </button>
      </div>
    </div>
  )
}

export default ProductDisplay