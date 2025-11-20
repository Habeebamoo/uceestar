"use client";

import { setProfile } from "@/redux/reducers/userSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export const useFetchUser = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/me`, {
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

        dispatch(setProfile(response.data));
      } catch (error) {
        setIsError(true)
        console.log("Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { isLoading, isError }
}