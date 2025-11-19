import { CartItem } from "@/types/cart"

const CartItemDisplay = ({ item }: { item: CartItem }) => {
  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const truncate = (text: string, length: number): string => {
    if (text.length <= length) return text;

    return text.slice(0, length) + "..."
  }

  return (
    <tr>
      <td className="flex-start gap-3 px-2 py-3 border-b border-gray-200">
        <div className="h-10 w-15 bg-gray-200"></div>
        <p className="font-jsans text-[12px]">{truncate(item.name, 15)}</p>
      </td>

      <td className="font-jsans-light text-sm px-2 py-3 border-b border-gray-200">
        &#x20A6; {formatCurrency(item.price)}
      </td>

      <td className="font-jsans text-[12px] px-2 py-3 border-b border-gray-200">{item.quantity}</td>

      <td className="font-jsans-light text-[12px] px-2 py-3 border-b border-gray-200">
        &#x20A6; {formatCurrency(item.price * item.quantity)}
      </td>
    </tr>
  )
}

export default CartItemDisplay