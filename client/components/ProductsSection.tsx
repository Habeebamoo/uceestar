import { Product } from "@/types/product";
import ProductDisplay from "./ProductDisplay";

const ProductsSection = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {products.map((prod, i) => <ProductDisplay key={i} product={prod} /> )}
    </div>
  )
}

export default ProductsSection