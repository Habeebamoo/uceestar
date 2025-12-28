import { ArrowRight, ShoppingCart } from "lucide-react"

interface Props {
  img: string,
  name: string,
  price: number
}

const HeroCard = ({ img, name, price }: Props) => {
  const beforePrice = price + (price * 0.15);

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="relative rounded-xl overflow-hidden">
      <img src={img} className="h-70 md:h-100 lg:h-140 w-full object-center object-cover" />

      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent from-0% via-black/70 via-50% to-black to-100% p-4 md:p-6 lg:p-8">
        <h1 className="text-white font-outfit text-2xl md:text-4xl lg:text-6xl mt-27 md:mt-50 lg:mt-80">{name}</h1>

        <div className="text-white flex-start gap-4 mt-2">
          <p className="font-jsans lg:text-xl">
            &#x20A6; {formatCurrency(price)}
          </p>

          <p className="text-gray-400  text-sm lg:text-md font-outfit line-through">
            &#x20A6; {formatCurrency(beforePrice)}
          </p>
        </div>

        <button className="btn-blue font-outfit py-3 px-4 rounded-xl flex-center gap-2">
          <span>Shop Now</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  )
}

export default HeroCard