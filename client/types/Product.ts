import { categories } from "@/app/page";

export interface Product {
  id: string,
  name: string,
  category: categories,
  price: number,
  description: string
}