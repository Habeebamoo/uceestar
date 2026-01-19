import { Product } from "@/types/product"
import ProductDisplay from "./ProductDisplay"
import { Flame } from "lucide-react"

interface Props {
  products: Product[]
} 

const FlashDeals = ({ products }: Props) => {
  return (
    <div className="pt-8 mt-16 bg-dark px-4">
      <div className="flex-start gap-2">
        <Flame color="white" />
        <h1 className="text-white font-outfit text-xl lg:text-2xl">Flash Deals</h1>
      </div>

      <div className="overflow-x-auto flex whitespace-nowrap mt-8 pb-8 gap-6">
        {products.map(prd => {
          return (
            <div key={prd._id} className="shrink-0">
              <ProductDisplay product={prd} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FlashDeals