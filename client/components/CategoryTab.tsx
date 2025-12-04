import { categories } from "@/app/page";
import { Dispatch, SetStateAction } from "react"

interface Props {
  category: categories,
  setCategory: Dispatch<SetStateAction<categories>>
}

const CategoryTab = ({ category ,setCategory }: Props) => {
  const selectCategory = (cat: categories) => {
    setCategory(cat)
  }

  return (
    <div className="py-8 px-4 flex overflow-x-auto space-x-4">
      <div 
        onClick={() => selectCategory("footwears")}
        className="h-40 w-50 footwears flex-none cursor-pointer"
      >
        <div className="h-full w-full bg-black/75 flex-center text-center font-jsans text-white">
          <p>Footwears</p>
        </div>
      </div>

      <div
        onClick={() => selectCategory("watches")} 
        className="watches h-40 w-50 flex-none cursor-pointer"
      >
        <div className="h-full w-full bg-black/75 flex-center text-center font-jsans text-white">
          <p>Watches</p>
        </div>
      </div>

      <div
        onClick={() => selectCategory("phones")} 
        className="phones h-40 w-50 flex-none cursor-pointer"
      >
        <div className="h-full w-full bg-black/75 flex-center text-center font-jsans text-white">
          <p>Phones</p>
        </div>
      </div>

      <div
        onClick={() => selectCategory("laptops")} 
        className="laptops h-40 w-50 flex-none cursor-pointer"
      >
        <div className="h-full w-full bg-black/75 flex-center text-center font-jsans text-white">
          <p>Laptops</p>
        </div>
      </div>

      <div
        onClick={() => selectCategory("gadgets")} 
        className="gadgets h-40 w-50 flex-none cursor-pointer"
      >
        <div className="h-full w-full bg-black/75 flex-center text-center font-jsans text-white">
          <p>Car Gadgets</p>
        </div>
      </div>
    </div>
  )
}

export default CategoryTab