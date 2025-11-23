import { categories } from "@/app/page";

export interface Product {
  _id: string,
  image: string,
  name: string,
  category: categories,
  price: number,
  description: string
}

export const products: Product[] = [
  {_id: "sjsisissos", image: "", name: "Nike Sneakers Jorgas", price: 16000, category: "footwears", description: "Discover curated collections of premium footwears, cutting-edge technologies and lifestyle essentials crafted for the modern world" },
  {_id: "j9ejdnidnkd", image: "", name: "Addidas", price: 85000, category: "footwears", description: "Discover curated collections of premium footwears, cutting-edge technologies and lifestyle essentials crafted for the modern world" },
  {_id: "ijwnixiwiwn", image: "", name: "Roles", price: 19500, category: "watches", description: "Discover curated collections of premium footwears, cutting-edge technologies and lifestyle essentials crafted for the modern world" },
]