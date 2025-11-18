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
    <div className="bg-gray-100 py-8 px-2 border-1 border-gray-200 flex overflow-x-auto space-x-4">
      <div 
      onClick={() => selectCategory("sneakers")}
        className={`${category === "sneakers" ? "category-tab-active" : "category-tab"}`}
      >
        Sneakers
      </div>

      <div 
      onClick={() => selectCategory("loafers")}
        className={`${category === "loafers" ? "category-tab-active" : "category-tab"}`}
      >
        Loafers
      </div>

      <div
      onClick={() => selectCategory("huddies")} 
        className={`${category === "huddies" ? "category-tab-active" : "category-tab"}`}
      >
        Huddies
      </div>

      <div
        onClick={() => selectCategory("phones")} 
        className={`${category === "phones" ? "category-tab-active" : "category-tab"}`}
      >
        Phones
      </div>

      <div
        onClick={() => selectCategory("watches")} 
        className={`${category === "watches" ? "category-tab-active" : "category-tab"}`}
      >
        Smart Watches
      </div>

      <div
        onClick={() => selectCategory("limiters")} 
        className={`${category === "limiters" ? "category-tab-active" : "category-tab"}`}
      >
        Speed Limiters
      </div>

      <div
        onClick={() => selectCategory("trackers")} 
        className={`${category === "trackers" ? "category-tab-active" : "category-tab"}`}
      >
        GPS Trackers
      </div>
    </div>
  )
}

export default CategoryTab