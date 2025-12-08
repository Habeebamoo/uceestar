import { CartItem } from "@/types/cart"

const CartItemDisplay = ({ item }: { item: CartItem }) => {
  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="bg-white p-4 border-1 border-gray-200 rounded-md">
      <div className="flex-start gap-3">
        {/* image */}
        <div className="bg-gray-100 h-20 w-25">
          <img src={item.image} className="w-full h-full object-cover object-center" />
        </div>

        <div>
          <p className="font-jsans-light text-[12px]">{item.category.toUpperCase()}</p>
          <h1 className="font-jsans mt-1">{item.name}</h1>
        </div>
      </div>

      <div className="flex-between mt-6 px-2">
        {/* price */}
        <div>
          <p className="font-jsans-light text-[12px]">Price</p>
          <p className="text-sm font-jsans">
            &#x20A6; {formatCurrency(item.price)}
          </p> 
        </div>

        <div className="flex-end gap-6">
          {/* quantity */}
          <div>
            <p className="font-jsans-light text-[12px]">Quantity</p>
            <p className="font-jsans text-sm">
              {item.quantity}
            </p>
          </div>

          {/* total */}
          <div>
            <p className="font-jsans-light text-[12px]">Total</p>
            <p className="font-jsans text-sm">
              &#x20A6; {formatCurrency(item.price * item.quantity)}
            </p> 
          </div>

        </div>
      </div>

      
    </div>
  )
}

export default CartItemDisplay