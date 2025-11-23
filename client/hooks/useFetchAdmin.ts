"use client";

import { setAdmin } from "@/redux/reducers/userSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export const useFetchAdmin = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
          },
          credentials: "include"
        })

        const response = await res.json()

        if (!res.ok) {
          setIsError(true)
          console.log(response.message)
          return
        }

        dispatch(setAdmin(response.data));
      } catch (error) {
        setIsError(true)
        console.log("Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdmin()
  }, [])

  return { isLoading, isError }
}