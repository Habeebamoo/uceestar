"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [navbarActive, setNavbarActive] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  
  const router = useRouter();

  const handleSuccess = async (googleResponse: CredentialResponse) => {
    setLoading(true)

    try {
      const googleRes = await fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + googleResponse.credential)
      const user = await googleRes.json()

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        },
        credentials: "include",
        body: JSON.stringify({
          name: user.name,
          email: user.email
        })
      })

      const response = await res.json()

      if (!res.ok) {
        toast.error(response.message);
        return
      }

      toast.success(response.message)
      setTimeout(() => {
        router.push("/cart")
      }, 2500)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleError = () => {
    toast.error("Something went wrong")
  }

  const toAdmin = () => {
    router.push("/admin")
  }

  return (
    <main className="pt-60 min-h-[calc(100vh-4rem)]">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />

      {loading && <Loading />}
      <Toaster position="top-center" />

      <div className="flex-center flex-col">
        <img src="/logo.png" className="h-8" />

        <h1 className="font-jsans text-2xl mt-3">Welcome to Uceestar</h1>

        <p className="text-center mt-3 font-jsans-light w-[85%] text-sm text-gray-500 mb-6">Sign in to your account to complete your purchase</p>

        <div className={navbarActive ? "z-[-1]" : ""}>
          <GoogleLogin 
            onSuccess={handleSuccess} 
            onError={handleError}
          />
        </div>

        <p className="text-center mt-8 font-jsans w-[85%] text-[12px] text-gray-500">Want to sign in as admin,
          <span 
            onClick={toAdmin}
            className="text-indigo-950 cursor-pointer ml-1"
          >
            Click here
          </span>
        </p>
      </div>

    </main>
  )
}

export default SignIn