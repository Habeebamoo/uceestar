import { categories } from "@/app/page";

export interface Product {
  _id: string,
  image: string,
  name: string,
  category: categories,
  price: number,
  description: string
}