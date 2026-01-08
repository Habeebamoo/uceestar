import { redirect } from "next/navigation"

const Footer = () => {
  const toDev = () => {
    redirect("https://habeebamoo.netlify.app")
  }

  const year = new Date().getFullYear()

  return (
    <footer className="bg-indigo-950 p-8 pb-10 text-white mt-25">
      <div>
        <h1 className="font-jsans text-lg">UCEESTAR</h1>
        <p className="text-[12px] font-jsans-light mt-1">By PJ Star LTD.</p>
      </div>

      <hr className="text-gray-700 mt-8" />

      <p className="font-jsans-light text-gray-300 text-sm mt-8">Uceestar {year}. All right reserved</p>
    </footer>
  )
}

export default Footer