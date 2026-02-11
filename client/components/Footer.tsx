import { Mail, MapPin, Phone } from "lucide-react"
import { redirect } from "next/navigation"
import { BsWhatsapp } from "react-icons/bs"

const Footer = () => {
  const toDev = () => {
    redirect("https://habeebamoo.netlify.app")
  }

  const year = new Date().getFullYear()

  return (
    <footer className="bg-indigo-950 p-8 pb-10 text-white mt-25">
      <section className="md:grid md:grid-cols-3">
        <div>
          <div className="h-10 w-10 bg-white flex-center rounded-full">
            <img src="/logo.png" className="h-5" />
          </div>
          <h1 className="font-jsans mt-3 text-lg">UCEESTAR</h1>
          <p className="text-[12px] text-gray-300 font-jsans-light mt-2">By PJ Star LTD.</p>
        </div>

        <div className="max-md:mt-10 md:flex-center md:flex-col">
          <div>
            <div className="flex-start gap-2 font-jsans-light">
              <Mail className="text-gray-400" size={16} />
              <p className="text-gray-300 text-sm">uceestar@gmail.com</p>
            </div>

            <div className="flex-start gap-2 font-jsans-light mt-2">
              <Phone className="text-gray-400" size={16} />
              <p className="text-gray-300 text-sm">+243 905 731 2712</p>
            </div>

            <div className="flex-start gap-2 font-jsans-light mt-2">
              <BsWhatsapp className="text-gray-400" size={16} />
              <p className="text-gray-300 text-sm">+243 902 422 8180</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="text-gray-700 mt-8" />

      <p className="font-jsans-light text-gray-300 text-[12px] mt-8">
        Uceestar &copy; {year}. All right reserved
      </p>
    </footer>
  )
}

export default Footer