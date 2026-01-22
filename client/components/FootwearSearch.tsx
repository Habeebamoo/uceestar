import { Product } from "@/types/product"
import { Flame } from "lucide-react"
import FlashDealDisplay from "./FlashDealDisplay"
import { getFootwears } from "@/utils/products"

interface Props {
  products: Product[]
} 

const FootwearSearch = ({ products }: Props) => {
  const footwears = getFootwears(products)

  return (
    <>
      {footwears.length >=1 
      ?
        <div className="pt-8 mt-8 md:mt-12 bg-gray-50 border border-gray-100 px-2 sm:px-4 md:px-6">
          <div className="flex-start gap-2">
            <Flame />
            <h1 className="font-outfit text-xl lg:text-2xl">
              Footwears
            </h1>
          </div>

          <div className="overflow-x-auto flex whitespace-nowrap mt-8 pb-8 gap-6">
            {footwears.map(prd => {
              return (
                <div key={prd._id} className="shrink-0">
                  <FlashDealDisplay product={prd} />
                </div>
              )
            })}
          </div>
        </div>
      :
        <div></div>
      }
    </>
  )
}

export default FootwearSearch