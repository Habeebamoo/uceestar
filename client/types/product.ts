import { categories } from "@/app/page";

export interface Product {
  id: string,
  name: string,
  category: categories,
  price: number,
  description: string
}

export const products: Product[] = [
  {id: "sjsisissos", name: "Nike Sneakers Jorgas", price: 16000, category: "sneakers", description: "Discover curated collections of premium footwears, cutting-edge technologies and lifestyle essentials crafted for the modern world" },
  {id: "j9ejdnidnkd", name: "Addidas", price: 85000, category: "sneakers", description: "Discover curated collections of premium footwears, cutting-edge technologies and lifestyle essentials crafted for the modern world" },
  {id: "ijwnixiwiwn", name: "Nike", price: 19500, category: "loafers", description: "Discover curated collections of premium footwears, cutting-edge technologies and lifestyle essentials crafted for the modern world" },
]