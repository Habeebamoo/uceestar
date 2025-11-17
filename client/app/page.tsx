import { ArrowRight } from "lucide-react"

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="mt-20 hero-section">
        <div className="bg-black/70 py-20 flex-center flex-col">
          <div className="py-2 px-4 rounded-xl bg-gray-200/30 text-sm flex-center gap-2 border-1 border-gray-400">
            <div className="h-2 w-2 rounded-full bg-red-900">

            </div>
            <p className="font-jsans text-white">Discover Curated Collections</p>
          </div>

          <div className="text-white mt-4 leading-tight">
            <p className="font-playfair-bold text-center text-[40px]">Style Meets</p>
            <p className="font-thin text-center text-[40px]">Innovation</p>
          </div>

          <p className="font-jsans text-gray-200 mt-4 text-center w-[80%] sm:w-[50%]">Discover curated collections of premium footwears, cutting-edge technologies and lifestyle essentials crafted for the modern world</p>

          <button className="btn-wine py-3 px-6 flex-center gap-2 mt-6">
            <span>Explore Now</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </main>
  )
}

export default Home