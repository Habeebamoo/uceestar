import { redirect } from "next/navigation"

const Footer = () => {
  const toDev = () => {
    redirect("https://habeebamoo.netlify.app")
  }

  return (
    <footer className="bg-indigo-950 p-8 pb-30 text-white mt-25">
      <div>
        <h1 className="font-jsans text-lg">UCEESTAR</h1>
        <p className="text-[12px] font-jsans-light mt-1">By PJ Star LTD.</p>
      </div>

      <div className="mt-20">
        <h1 className="font-jsans text-lg">Contact Us</h1>
        <p className="underline font-jsans-light mt-4 text-sm">uceestar@gmail.com</p>
        <p className="text-sm font-jsans-light mt-4">Mobile: +234 905 7312 712</p>
        <p className="text-sm font-jsans-light mt-4">Whatsapp: +234 902 4228 180</p>
      </div>

      <p className="mt-20 font-jsans-light text-sm">Discover curated collections of premium footwears, cutting-edge technologies and lifestyle essentials crafted for the modern world</p>

      <div className="mt-20">
        <h1 className="font-jsans text-lg">Quick Links</h1>
        <p className="font-jsans-light mt-4 text-sm">Search</p>
        <p 
          onClick={toDev} 
          className="cursor-pointer font-jsans-light mt-4 text-sm"
        >
          Developers Profile
        </p>
        <p className="font-jsans-light mt-4 text-sm">FAQ</p>
      </div>
    </footer>
  )
}

export default Footer