"use client";

import { Menu } from "lucide-react"
import Image from "next/image"
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";

const AdminHeader = () => {
  const [navbarActive, setNavbarActive] = useState<boolean>(false)

  return (
    <header className="bg-white fixed top-0 left-0 right-0 border-b border-gray-200">
      <nav className="p-4 flex-between">
        {navbarActive && <AdminNavbar setNavbarActive={setNavbarActive} />}

        {/* logo */}
        <div>
          <Image src="/logo.png" alt="Logo" height={30} width={30} />
        </div>

        {/* menu */}
        <div
          onClick={() => setNavbarActive(true)} 
          className="cursor-pointer"
        >
          <Menu />
        </div>
      </nav>
    </header>
  )
}

export default AdminHeader