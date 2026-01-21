import { categories } from "@/app/page"
import { Dispatch, SetStateAction } from "react";

interface Props {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>
}

const AdminProductsTab = ({ category, setCategory }: Props) => {
  return (
    <section>
      {/* desktop */}
      <div className="max-md:hidden mt-10 w-150 mx-auto flex-between p-1 gap-2 rounded-full bg-gray-100">
        <div
          onClick={() => setCategory("footwears")} 
          className={category === "footwears" ? "admin-products-tab-active" : "admin-products-tab"}
        >
          Footwears
        </div>
        <div 
          onClick={() => setCategory("watches")}
          className={category === "watches" ? "admin-products-tab-active" : "admin-products-tab"}
        >
          Watches
        </div>
        <div 
          onClick={() => setCategory("phones")}
          className={category === "phones" ? "admin-products-tab-active" : "admin-products-tab"}
        >
          Phones
        </div>
        <div 
          onClick={() => setCategory("laptops")}
          className={category === "laptops" ? "admin-products-tab-active" : "admin-products-tab"}
        >
          Laptops
        </div>
      </div>


      {/* mobile */}
      <div className="md:hidden sm:w-100 mx-auto mb-10">
        <select
          className="bg-gray-100 rounded-2xl focus:outline-none border border-gray-200 w-full font-jsans-light py-3 text-sm px-4"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="footwears">Footwears</option>
          <option value="watches">Watches</option>
        </select>
      </div>
    </section>
  )
}

export default AdminProductsTab