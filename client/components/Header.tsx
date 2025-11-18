import { Menu, Search, ShoppingCart} from "lucide-react"

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow">
      <nav className="p-6 flex-between">
        {/* logo */}
        <div className="font-jsans text-lg">
          <h1>Logo</h1>
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