"use client";

import Header from "@/components/Header"
import { Check, LoaderCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Payment = () => {
  const [navbarActive, setNavbarActive] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [status, setStatus] = useState<"success" | "error">("success");
  const [msg, setMsg] = useState<string>("")
  const router = useRouter();

  useEffect(() => {  
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("reference");

    if (!ref) {
      toast.error("Something went wrong");
      router.push("/cart")
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/payment/verify?reference=${ref}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
          },
          credentials: "include"
        });

        const response = await res.json()

        if (!res.ok) {
          setModal(true)
          setStatus("error")
          setMsg(response.message)
          return
        }

        setModal(true)
        setStatus("success")
        setMsg(response.message)

        setTimeout(() => {
          router.push("/orders")
        }, 2000)
      } catch (error) {
        setModal(true)
        setStatus("error")
        setMsg("Something went wrong")
      }
    }

    verifyPayment()
  }, [])

  return (
    <main className="pt-20 bg-gray-50 min-h-screen">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />
      <Toaster />
      {modal && <Modal status={status} msg={msg} />}

      <section className="w-[80%] sm:w-[400px] bg-white border-1 border-gray-200 p-6 mx-auto mt-30 rounded-xl">
        <div className="text-gray-800 flex-center">
          <LoaderCircle size={30} className="animate-spin" />
        </div>
        <h1 className="font-jsans text-xl text-indigo-950 text-center mt-4">Verifying Payment...</h1>
        <p className="font-jsans-light mt-2 text-[12px] text-center">Please wait, we are verifying your payment</p>
      </section>
    </main>
  )
}

const Modal = ({ status, msg }: { status: "success" | "error", msg: string }) => {
  return (
    <main className="fixed top-0 bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm flex-center z-20">
      <div className="bg-white w-[80%] sm:w-[300px] py-6 border-1 border-gray-200 flex-center flex-col rounded-xl">
        <div>
          {status === "success" ? 
            <div className="bg-green-600 h-12 w-12 rounded-full flex-center">
              <Check color="white" size={30} /> 
            </div>
          : 
            <div className="bg-red-500 h-11 w-11 rounded-full flex-center">
              <X color="white" />
            </div>
          }
        </div>
        <div className="mt-4 text-xl font-jsans">
          <p>{msg}</p>
        </div>
      </div>
    </main>
  )
}

export default Payment