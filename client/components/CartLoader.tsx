"use client";

import { setCart } from "@/redux/reducers/cartSlice";
import { CartItem } from "@/types/cart";
import { useEffect } from "react";
import { useDispatch } from "react-redux"

const CartLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart: CartItem[] = JSON.parse(localStorage.getItem("uceestar-cart")!)

    if (storedCart) {
      dispatch(setCart(storedCart))
    }
  }, [])
  
  return null
}

export default CartLoader