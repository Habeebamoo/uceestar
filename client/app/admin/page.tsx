"use client";

import Header from "@/components/Header"
import Loading from "@/components/Loading";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Admin = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [navbarActive, setNavbarActive] = useState<boolean>(false)
  const router = useRouter();

  const handleSuccess = async (googleResponse: CredentialResponse) => {
    setLoading(true)

    try {
      const googleRes = await fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + googleResponse.credential)
      const user = await googleRes.json()

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        },
        credentials: "include",
        body: JSON.stringify({
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
        router.push("/admin/dashboard")
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
    <main className="bg-gray-50 pt-60 pb-30 px-4 min-h-screen">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />

      {loading && <Loading />}
      <Toaster position="top-center" />

      <div className="flex-center flex-col">
        <img src="/logo.png" className="h-8" />

        <h1 className="font-jsans text-2xl mt-3">Admin Login</h1>

        <p className="text-center mt-3 font-jsans-light w-[85%] text-sm text-gray-600 mb-6">
          <span className="font-jsans">Welcome Back!. </span> Sign in back to access your dashboard
        </p>

        <div className={navbarActive ? "z-[-1]" : ""}>
          <GoogleLogin 
            onSuccess={handleSuccess} 
            onError={handleError} 
          />
        </div>
      </div>
    </main>
  )
}

export default Admin