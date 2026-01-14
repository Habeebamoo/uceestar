import { Product } from "@/types/product";
import ProductDisplay from "./ProductDisplay";

const ProductsSection = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 min-[550px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
      {products.map((prod, i) => <ProductDisplay key={i} product={prod} /> )}
    </div>
  )
}

export default ProductsSection