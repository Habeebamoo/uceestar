import { categories } from "@/app/page";
import { CarFront, Footprints, Laptop, Smartphone, Watch } from "lucide-react";
import { Dispatch, SetStateAction } from "react"
import { FaTools } from "react-icons/fa";
import { GiDoorWatcher } from "react-icons/gi";

interface Props {
  category: categories,
  setCategory: Dispatch<SetStateAction<categories>>
}

const CategoryTab = ({ category ,setCategory }: Props) => {
  const selectCategory = (cat: categories) => {
    setCategory(cat)
  }

  return (
    <div className="py-8 px-4 flex overflow-x-auto space-x-8">
      <div
        onClick={() => selectCategory("footwears")}
        className={category === "footwears" ? "category-tab-active" : "category-tab"}
      >
        <div className="p-4 bg-gray-300 rounded-xl flex-center text-gray-600">
          <Footprints size={40} />
        </div>
        <p className="mt-3">Footwears</p>
      </div>

      <div
        onClick={() => selectCategory("watches")}
        className={category === "watches" ? "category-tab-active" : "category-tab"}
      >
        <div className="p-4 bg-gray-300 rounded-xl flex-center text-gray-600">
          <Watch size={40} />
        </div>
        <p className="mt-3">Watches</p>
      </div>

      <div
        onClick={() => selectCategory("phones")}
        className={category === "phones" ? "category-tab-active" : "category-tab"}
      >
        <div className="p-4 bg-gray-300 rounded-xl flex-center text-gray-600">
          <Smartphone size={40} />
        </div>
        <p className="mt-3">Phones</p>
      </div>

      <div
        onClick={() => selectCategory("laptops")}
        className={category === "laptops" ? "category-tab-active" : "category-tab"}
      >
        <div className="p-4 bg-gray-300 rounded-xl flex-center text-gray-600">
          <Laptop size={40} />
        </div>
        <p className="mt-3">Laptops</p>
      </div>

      <div
        onClick={() => selectCategory("gadgets")}
        className={category === "gadgets" ? "category-tab-active" : "category-tab"}
      >
        <div className="p-6 bg-gray-300 rounded-xl flex-center text-gray-600">
          <FaTools size={30} />
        </div>
        <p className="mt-3">Car Gadgets</p>
      </div>
    </div>
  )
}

export default CategoryTab