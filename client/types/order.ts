import { categories } from "@/app/page";

export interface Order {
  _id: string,
  name: string,
  category: categories,
  price: number,
  description: string,
  quantity: number,
  location: {
    city: string,
    address: string
  },
  status: string,
  deliveryDate: string
}