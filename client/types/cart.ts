import { categories } from "@/app/page";

export interface CartItem {
  id: string,
  name: string,
  category: categories,
  price: number,
  description: string,
  quantity: number
}