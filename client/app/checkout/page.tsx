"use client";

import Header from "@/components/Header"
import Loading from "@/components/Loading";
import { useFetchUser } from "@/hooks/useFetchUser";
import { clearCart } from "@/redux/reducers/cartSlice";
import { RootState } from "@/redux/store";
import { Binoculars } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {} = useFetchUser()

  const [navbarActive, setNavbarActive] = useState<boolean>(false)
  const [form, setForm] = useState({
    city: "lagos",
    address: "",
    phone: "+234"
  })

  const [loading, setLoading] = useState<boolean>(false)

  const cart = useSelector((state: RootState) => state.cart.cart);
  const user = useSelector((state: RootState) => state.user.profile);

  if (cart.length === 0) {
    return (
      <div className="pt-40">
        <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />
        
        <div className="flex-center flex-col text-gray-800">
          <Binoculars size={40} />
          <p className="font-outfit text-sm mt-4 text-center w-[80%]">You haven't added anything to your cart, Go back and browse our vast collection of products</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const getDeliveryCost = () => {
    let deliveryCost: number = 0;

    if (form.city === "lagos") {
      deliveryCost = 5000
    } else if (form.city === "ogun") {
      deliveryCost = 7000
    }

    return deliveryCost;
  }

  const getTotalCost = () => {
    let cost: number = 0;

    cart.forEach(item => {
      cost += item.price * item.quantity;
    })

    return cost
  }

  const deliveryCost = getDeliveryCost()
  const initialCost = getTotalCost()
  const totalCost = initialCost + deliveryCost;

  const deleteCart = () => {
    dispatch(clearCart([]))
  }
  
  const purchaseCart = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      router.push("/signin")
      return
    }

    if (!form.address || !form.city || form.phone.length < 13) {
      toast.error("Details are required")
      return
    }

    setLoading(true)

    const data = {
      email: user.email,
      details: form,
      cart: cart,
      amount: totalCost
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/payment/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        },
        body: JSON.stringify(data),
        credentials: "include"
      });

      const response = await res.json()

      if (!res.ok) {
        toast.error(response.message)
        return
      }

      window.location.href = response.authorizationURL;
      deleteCart();
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-gray-50 pt-24 pb-30 px-4 min-h-screen">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />
      {loading && <Loading />}
      <Toaster />

      <h1 className="font-jsans text-xl text-center">Checkout</h1>

       <form 
        onSubmit={purchaseCart}
        className="w-full sm:w-[400px] mx-auto p-6 bg-white border-1 border-gray-200 rounded-lg mt-10"
      >
        <div className="text-sm mt-4">
          <p className="font-jsans mb-2">State</p>
          <select 
            value={form.city}
            name="city"
            onChange={handleInputChange}
            className="bg-gray-100 py-3 rounded-xl px-4 font-jsans border-1 border-gray-200 w-full cursor-pointer"
          >
            <option value="abia">Abia</option>
            <option value="adamawa">Adamawa</option>
            <option value="akwa-ibom">Akwa Ibom</option>
            <option value="anambra">Anambra</option>
            <option value="bauchi">Bauchi</option>
            <option value="bayelsa">Bayelsa</option>
            <option value="benue">Benue</option>
            <option value="borno">Borno</option>
            <option value="cross-river">Cross River</option>
            <option value="delta">Delta</option>
            <option value="ebonyi">Ebonyi</option>
            <option value="edo">Edo</option>
            <option value="ekiti">Ekiti</option>
            <option value="enugu">Enugu</option>
            <option value="gombe">Gombe</option>
            <option value="imo">Imo</option>
            <option value="jigawa">Jigawa</option>
            <option value="kaduna">Kaduna</option>
            <option value="kano">Kano</option>
            <option value="katsina">Katsina</option>
            <option value="kebbi">Kebbi</option>
            <option value="kogi">Kogi</option>
            <option value="kwara">Kwara</option>
            <option value="lagos">Lagos</option>
            <option value="nasarawa">Nasarawa</option>
            <option value="niger">Niger</option>
            <option value="ogun">Ogun</option>
            <option value="ondo">Ondo</option>
            <option value="osun">Osun</option>
            <option value="oyo">Oyo</option>
            <option value="plateau">Plateau</option>
            <option value="rivers">Rivers</option>
            <option value="sokoto">Sokoto</option>
            <option value="taraba">Taraba</option>
            <option value="yobe">Yobe</option>
            <option value="zamfara">Zamfara</option>
          </select>
        </div>

        <div className="flex-between text-sm mt-6">
          <p className="font-jsans">Delivery Fee</p>
          <p className="font-jsans-light">&#x20A6; {formatCurrency(deliveryCost)}</p>
        </div>

        <div className='mt-6'>
          <label
            className="font-jsans-light text-sm" 
            htmlFor="address"
          >
            Address
          </label>
          <textarea 
            rows={4} 
            id="address" 
            name='address'
            className="block p-3 border-1 border-gray-100 rounded-md w-full mt-2 font-jsans text-sm focus:outline-none resize-none"
            value={form.address}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className='mt-6'>
          <label
            className="font-jsans-light text-sm" 
            htmlFor="phone"
          >
            Phone number
          </label>
          <input 
            type="text" 
            id="phone" 
            name='phone'
            className="block p-3 border-1 border-gray-100 rounded-md w-full mt-2 font-jsans text-sm focus:outline-none"
            placeholder="Nike Sneakers"
            value={form.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex-between mt-8 text-sm px-1">
          <p className="font-jsans">Total Cost</p>
          <p className="font-jsans text-indigo-950">&#x20A6; {formatCurrency(totalCost)}</p>
        </div>

        <div className="mt-8"> 
          <button
            className="btn-primary text-sm py-2 w-full rounded-md col-span-2 hover:text-indigo-950 active:text-indigo-950"
          >
            Pay
          </button>
        </div>
      </form>
    </main>
  )
}

export default CheckoutPage