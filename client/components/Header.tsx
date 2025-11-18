import { Menu, Search, ShoppingCart} from "lucide-react"
import Image from "next/image"

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow">
      <nav className="p-6 flex-between">
        {/* logo */}
        <div className="flex-start font-playfair-bold">
          <Image src="/logo.png" alt="logo" height={30} width={30} />
          <span className="mt-2 text-blue-800">ceestar</span>
        </div>

        {/* icons */}
        <div className="flex-between gap-8">
          <div className="cursor-pointer">
            <Search />
          </div>
          <div className="cursor-pointer">
            <ShoppingCart />
          </div>
          <div className="cursor-pointer">
            <Menu />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header