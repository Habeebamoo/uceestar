import { Product } from "@/types/product"

const AdminProductDisplay = ({ product }: { product: Product }) => {
  const truncate = (text: string, length: number): string => {
    if (text.length <= length) return text;

    return text.slice(0, length) + "..."
  }

  return (
    <div className="bg-white p-6 rounded-xl border-1 border-gray-200">
      <div className="flex-start gap-3">
        <div className="h-30 w-40">
          <img src={product.image} className="h-full w-full object-center object-cover" />
        </div>
        <div>
          <p className="font-jsans-light text-[10px]">{product.category.toUpperCase()}</p>
          <h1 className="font-jsans mt-2 text-lg">{product.name}</h1>
          <p className="font-jsans-light mt-4 text-[12px]">{truncate(product.description, 20)}</p>
        </div>
      </div>
      <button className="btn-primary mt-6 py-3 px-4 font-jsans text-sm rounded-md">View Product</button>
    </div>
  )
}

export default AdminProductDisplay