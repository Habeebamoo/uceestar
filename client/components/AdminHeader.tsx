"use client";

import { Menu } from "lucide-react"
import Image from "next/image"
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";

const AdminHeader = () => {
  const [navbarActive, setNabarActive] = useState<boolean>(false)

  return (
    <header className="bg-white fixed top-0 left-0 right-0 shadow">
      <nav className="lg:w-[70%] mx-auto p-4 flex-between">
        {navbarActive && <AdminNavbar setNavbarActive={setNabarActive} />}

        {/* logo */}
        <div>
          <Image src="/logo.png" alt="Logo" height={30} width={30} />
        </div>

        {/* menu */}
        <div
          onClick={() => setNabarActive(true)} 
          className="cursor-pointer"
        >
          <Menu />
        </div>
      </nav>
    </header>
  )
}

export default AdminHeader