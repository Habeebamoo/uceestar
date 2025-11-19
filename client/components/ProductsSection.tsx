import { Product } from "@/types/Product";
import ProductDisplay from "./ProductDisplay";

const ProductsSection = ({ products }: { products: Product[] }) => {
  return (
    <div>
      {products.map((prod, i) => <ProductDisplay key={i} product={prod} /> )}
    </div>
  )
}

export default ProductsSection