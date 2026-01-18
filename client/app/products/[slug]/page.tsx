"use client";

import Counter from "@/components/Counter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ReviewComment from "@/components/ReviewComment";
import ReviewModal from "@/components/ReviewModal";
import { useFetchReviews } from "@/hooks/useFetchReviews";
import { addToCart } from "@/redux/reducers/cartSlice";
import { RootState } from "@/redux/store";
import { CartItem } from "@/types/cart";
import { Review } from "@/types/review";
import { Binoculars, Star, StarIcon, Stars } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const params = useParams();
  const slug = params.slug;
  const dispatch = useDispatch()

  const {} = useFetchReviews(slug)

  const [quantity, setQuantity] = useState<number>(1)
  const [navbarActive, setNavbarActive] = useState<boolean>(false)
  const [reviewModal, setReviewModal] = useState<boolean>(false)

  const products = useSelector((state: RootState) => state.products.products)
  const cart = useSelector((state: RootState) => state.cart.cart);
  const reviews = useSelector((state: RootState) => state.products.reviews)

  const product = products.find(prod => prod._id == slug)

  if (!product) {
    return (
      <div className="pt-40">
        <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />
        
        <div className="flex-center flex-col text-gray-800">
          <Binoculars size={40} />
          <p className="font-outfit text-sm mt-4 text-center w-[80%]">Product not found, Go back and browse our vast collection of products</p>
        </div>
      </div>
    )
  }

  const addProductToCart = () => {
    const item: CartItem = { ...product!, quantity }
    dispatch(addToCart(item))

    toast.success("Added To Cart")
  }

  const getAverageStars = () => {
    let stars = 0;

    reviews.forEach(rv => {
      stars += rv.stars
    })

    return (stars / reviews.length)
  }

  const formerPrice = (product!.price) + (product!.price * 0.15)

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const avgStarRating = reviews.length === 0 ? 0 : getAverageStars()

  return (
    <main className="pt-20">
      <Header navbarActive={navbarActive} setNavbarActive={setNavbarActive} />
      <Toaster />

      {/* review modal */}
      {reviewModal && <ReviewModal productId={product._id} setReviewModal={setReviewModal} />}

      <section className="sm:w-[500px] mx-auto px-4">
        <div className="h-60 md:h-70 bg-gray-100">
          {/* image */}
          <img src={product.image} className="h-full rounded-sm w-full object-center object-cover" />
        </div>

        {/* category */}
        <p className="text-sm font-jsans-light mt-6 text-sm">
          {product.category.toUpperCase()}
        </p>

        {/* name */}
        <p className="text-2xl font-jsans mt-2">{product?.name}</p>

        {/* price */}
        <div className="mt-4 flex-between">
          <p className="font-jsans text-lg font-bold">&#x20A6; {formatCurrency(product?.price)}</p>

          <div className="flex-center gap-3">
            <p className="font-jsans font-bold text-gray-600 line-through">&#x20A6; {formatCurrency(formerPrice)}</p>

            <p className="bg-yellow-400 font-jsans py-1 px-3 rounded-full text-[12px]">-15%</p>
          </div>
        </div>

        {/* description */}
        {product.description &&
          <div className="mt-10">
            <h1 className="text-xl font-jsans">Description</h1>
            <p className="text-sm font-jsans text-gray-500 mt-4">{product.description}</p>
          </div>
        }

        <hr className="text-gray-200 mt-8" />

        <p className="font-jsans text-sm mt-6">Quantity</p>

        <div className="mt-4 grid grid-cols-2 gap-4 px-2">
          <Counter count={quantity} setCount={setQuantity} />

          <button 
            onClick={addProductToCart} 
            className="btn-primary text-sm py-3 w-full hover:text-indigo-950 active:text-indigo-950 rounded-lg"
          >
            Add To Cart
          </button>
        </div>


        {/* Reviews section */}
        <section className="mt-20">
          <h1 className="font-outfit text-2xl">Reviews</h1>

          {/* stars and ratings */}
          <div className="flex-start gap-6 mt-8">
            <h1 className="font-outfit text-6xl">{avgStarRating.toFixed(1)}</h1>

            {/* stars */}
            <div>
              <div className="flex-start gap-2">
                <div>
                  <Star className={avgStarRating >= 1 ? "text-yellow-300" : ""} size={18} />
                </div>

                <div>
                  <Star className={avgStarRating >= 2 ? "text-yellow-300" : ""} size={18} />
                </div>

                <div>
                  <Star className={avgStarRating >= 3 ? "text-yellow-300" : ""} size={18} />
                </div>

                <div>
                  <Star className={avgStarRating >= 4 ? "text-yellow-300" : ""} size={18} />
                </div>

                <div>
                  <Star className={avgStarRating == 5 ? "text-yellow-300" : ""} size={18} />
                </div>
              </div>

              <p className="text-sm font-jsans-light text-gray-500 mt-1">{reviews.length} ratings</p>
            </div>
          </div>
          
          <button onClick={() => setReviewModal(true)} className="btn-blue font-outfit text-sm py-2 px-4 mt-8 rounded-full">
            <span>Add a Review</span>
          </button>

          <hr className="text-gray-200 mt-10" />

          <div className="mt-10 grid grid-cols-1 gap-12">
            {reviews.map((rv: Review, i) => <ReviewComment key={i} review={rv} />)}
          </div>
        </section>
      </section>

      <Footer />
    </main>
  )
}

export default Page