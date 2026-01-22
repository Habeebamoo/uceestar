import { Product } from "@/types/product"
import { Flame } from "lucide-react"
import FlashDealDisplay from "./FlashDealDisplay"
import { combineAndShuffle, getRandom10 } from "@/utils/products"

interface Props {
  products: Product[]
} 

const FlashDeals = ({ products }: Props) => {
  const ftws = products.filter(prd => prd.category === "footwears")
  const footwears = getRandom10(ftws);

  const wtch = products.filter(prd => prd.category === "watches")
  const watches = getRandom10(wtch)

  const phns = products.filter(prd => prd.category === "phones")
  const phones = getRandom10(phns)

  const lpts = products.filter(prd => prd.category === "laptops")
  const laptops = getRandom10(lpts)

  const shuffledProducts = combineAndShuffle(footwears, watches, phones, laptops)

  return (
    <div className="pt-8 mt-10 md:mt-12 bg-dark px-2 sm:px-4 md:px-6">
      <div className="flex-start gap-2">
        <Flame color="white" />
        <h1 className="text-white font-outfit text-xl lg:text-2xl">
          Flash Deals
        </h1>
      </div>

      <div className="overflow-x-auto flex whitespace-nowrap mt-8 pb-8 gap-6">
        {shuffledProducts.map(prd => {
          return (
            <div key={prd._id} className="shrink-0">
              <FlashDealDisplay product={prd} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FlashDeals