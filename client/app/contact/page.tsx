"use client";

import Header from "@/components/Header";
import { useState } from "react"

const page = () => {
  const [navbarActive, setNavbarActive] = useState<boolean>(false)

  return (
    <main className="bg-gray-50 pt-24">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />
    </main>
  )
}

export default page