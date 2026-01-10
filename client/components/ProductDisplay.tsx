import { Product } from "@/types/product"
import { useRouter } from "next/navigation"

interface Props {
  product: Product
}

const ProductDisplay = ({ product }: Props) => {
  const router = useRouter()

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const toProduct = () => {
    router.push(`/products/${product._id}`)
  }

  return (
    <div
      onClick={toProduct} 
      className="bg-white border-1 border-gray-100 rounded-2xl h-[350px] rounded-xl overflow-hidden relative"
    >
      <img src={product.image} className="w-full h-full" />

      <div className="product-gradient-overlay cursor-pointer">
        <div className="absolute bottom-5 px-6 text-white">
          <p className="font-jsans text-xl">{product.name}</p>

          <div className="mt-4 font-jsans-light flex-start gap-1">
            <span>&#x20A6;</span>
            <p>{formatCurrency(product.price)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay