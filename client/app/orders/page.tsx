import Header from "@/components/Header"
import OrderItemDisplay from "@/components/OrderItemDisplay"
import { Order } from "@/types/order"

const orders: Order[] = [
  {  _id: "keooeoeoe", 
    name: "Nike Sneakers",
    category: "sneakers",
    price: 28000,
    description: "short sneakers",
    quantity: 2,
    location: {
      city: "lagos",
      address: "24, Ojodu street"
    },
    status: "Processing",
    deliveryDate: "May 6 2024"
  },
  {  _id: "ijhhjmnmeoe", 
    name: "Nike Sneakers",
    category: "sneakers",
    price: 28000,
    description: "short sneakers",
    quantity: 5,
    location: {
      city: "lagos",
      address: "24, Ojodu street"
    },
    status: "Processing",
    deliveryDate: "May 5 2025"
  },
    {  _id: "ijjmnmeoe", 
    name: "Nike Sneakers",
    category: "sneakers",
    price: 28000,
    description: "short sneakers",
    quantity: 5,
    location: {
      city: "lagos",
      address: "24, Ojodu street"
    },
    status: "Processing",
    deliveryDate: "May 5 2025"
  },
]

const Orders = () => {
  return (
    <main className="py-20 bg-gray-50 px-4 min-h-screen">
      <Header />

      <h1 className="font-jsans text-2xl mt-2">My Orders</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {orders.map((order: Order) => <OrderItemDisplay key={order._id} order={order} />)}
      </section>
    </main>
  )
}

export default Orders