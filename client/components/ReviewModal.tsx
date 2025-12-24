"use client";

import { useFetchUser } from "@/hooks/useFetchUser";
import { RootState } from "@/redux/store";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface Props {
  productId: string,
  setReviewModal: Dispatch<SetStateAction<boolean>>
}

const ReviewModal = ({ productId, setReviewModal }: Props) => {
  const {} = useFetchUser()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [form, setForm] = useState({
    name: "",
    comment: "",
    stars: 0
  })

  const user = useSelector((state: RootState) => state.user.profile);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const addReview = async () => {
    if (!user) {
      router.push("/signin")
      return
    }

    if (!form.name || !form.comment) {
      return
    }
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        },
        body: JSON.stringify(form),
        credentials: "include"
      })

      const response = await res.json()

      if (!res.ok) {
        toast.error(response.message)
        return
      }

      toast.success(response.message)
      setTimeout(() => {
        setReviewModal(false)
      }, 2500)
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/70 flex-center">
      <div className="bg-white p-8 rounded-lg w-[90%] sm:w-[400px]">
        <h1 className="font-outfit text-xl text-center">Write Your Review</h1>

        <div className="mt-6">
          <label htmlFor="name" className="font-jsans-light text-sm">Name</label>
          <input 
            type="text" 
            id="name"
            name="name"
            className="p-3 bg-gray-50 focus:outline-none font-jsans-light border-1 border-gray-100 rounded-xl block w-full mt-3"
            value={form.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-6">
          <label htmlFor="comment" className="font-jsans-light text-sm">Comment</label>
          <textarea 
            rows={4}
            id="comment"
            name="comment"
            className="p-3 bg-gray-50 focus:outline-none resize-none font-jsans-light border-1 border-gray-100 rounded-xl block w-full mt-3"
            value={form.comment}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="mt-8">
          {loading ? 
            <button className="py-3 w-full bg-gray-100 border-1 border-gray-200 flex-center">
              <LoaderCircle className="animate-spin" color="gray" size={20} />
            </button>
          :
            <button 
              onClick={addReview} 
              className="btn-blue font-outfit text-sm py-3 w-full"
            >
              Add
            </button>
          }

          <button 
            onClick={() => setReviewModal(false)} 
            className="btn-blue font-outfit text-sm py-3 w-full bg-red-500 border-red-500 hover:text-red-500 active:text-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal