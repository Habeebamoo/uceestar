import { Product } from "@/types/product";
import ProductDisplay from "./ProductDisplay";

const ProductsSection = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-6">
      {products.map((prod, i) => <ProductDisplay key={i} product={prod} /> )}
    </div>
  )
}

export default ProductsSection