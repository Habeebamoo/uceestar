"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import Link from "next/link";
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

  return (
    <main className="pt-60 min-h-[calc(100vh-4rem)]">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />

      {loading && <Loading />}
      <Toaster position="top-center" />

      <div className="flex-center flex-col">
        <div className="h-18 w-18 bg-gray-100 flex-center rounded-full shadow">
          <img src="/logo.png" className="h-8" />
        </div>

        <h1 className="font-outfit text-3xl mt-4">Welcome to Uceestar</h1>

        <p className="text-center mt-2 font-jsans-light w-[85%] text-sm text-gray-700 mb-6">Sign in to your account to view your profile</p>

        <div className={navbarActive ? "z-[-1] google-btn" : "google-btn"}>
          <GoogleLogin 
            onSuccess={handleSuccess} 
            onError={handleError}
          />
        </div>

        <p className="text-center mt-10 font-outfit w-[85%] text-sm text-gray-500">Want to sign in as admin, 
          <Link href="/admin">
            <span className="text-indigo-950"> Click here</span>
          </Link>
        </p>
      </div>

    </main>
  )
}

export default SignIn