import { Product } from "@/types/product"
import { useRouter } from "next/navigation";
import { SlArrowRight } from "react-icons/sl";

const AdminProductDisplay = ({ product }: { product: Product }) => {
  const router = useRouter();

  const truncate = (text: string, length: number): string => {
    if (text.length <= length) return text;

    return text.slice(0, length) + "..."
  }

  const toProduct = () => {
    router.push(`/admin/products/${product._id}`)
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex-start gap-3">
        <div className="h-30 w-40">
          <img src={product.image} className="h-full w-full object-center object-cover" />
        </div>
        <div>
          <p className="font-jsans-light text-[10px]">{product.category.toUpperCase()}</p>
          <h1 className="font-jsans mt-2 text-lg">{product.name}</h1>
          <p className="font-jsans-light mt-4 text-[12px]">{truncate(product.description, 50)}</p>
        </div>
      </div>
      <button 
        onClick={toProduct} 
        className="bg-gray-100 border border-gray-200 cursor-pointer mt-6 py-3 px-5 font-jsans-light flex-center gap-2 text-sm rounded-md"
      >
        <span>View</span>
        <SlArrowRight size={12} />
      </button>
    </div>
  )
}

export default AdminProductDisplay