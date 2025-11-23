"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
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
    <main className="pt-20 flex-center flex-col min-h-[calc(100vh-4rem)]">
      <Header />
      {loading && <Loading />}
      <Toaster position="top-center" />

      <h1 className="font-jsans text-3xl">Hi friend!</h1>

      <p className="text-center mt-4 font-jsans-light w-[85%] text-sm text-gray-400 mb-6">Sign in to your account to complete your purchase</p>

      <div className="relative z-10">
        <GoogleLogin 
          onSuccess={handleSuccess} 
          onError={handleError} 
        />
      </div>

      <p className="text-center mt-4 font-jsans-light w-[85%] text-[12px] text-gray-400">Want to sign in as admin,
        <span 
          onClick={toAdmin}
          className="text-indigo-950 cursor-pointer ml-1"
        >
          Click here
        </span>
      </p>

    </main>
  )
}

export default SignIn