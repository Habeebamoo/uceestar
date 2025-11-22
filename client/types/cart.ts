import { categories } from "@/app/page";

export interface CartItem {
  _id: string,
  image: string,
  name: string,
  category: categories,
  price: number,
  description: string,
  quantity: number
}