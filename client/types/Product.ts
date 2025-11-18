import { categories } from "@/app/page";

export interface Product {
  name: string,
  category: categories,
  price: number
}