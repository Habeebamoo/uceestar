import { ArrowRight } from "lucide-react";

interface Props {
  img: string,
  name: string,
  price: number,
  height?: number
}

const DesktopHeroCard = ({ img, name, height, price }: Props) => {
  const beforePrice = price + (price * 0.15);

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className={`h-[${height}px] rounded-xl overflow-hidden relative col-span-3`}>
      <img src={img} className="w-full h-full object-center object-cover" />

      <div className="gradient-overlay p-8">
        <div className="absolute bottom-[40px]">
          <h1 className="text-white font-outfit text-2xl md:text-4xl lg:text-6xl">{name}</h1>

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
    </div>
  )
}

// export default DesktopHeroCard